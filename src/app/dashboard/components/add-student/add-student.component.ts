import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StandardsService } from 'src/app/services/standards.service';
import { StudentsService } from 'src/app/services/students.service';
import { AddStandardComponent } from '../add-standard/add-standard.component';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  form: FormGroup = new FormGroup({
    standard: new FormControl(),
    name: new FormControl()
  });

  standards$ = new Observable<any>();


  constructor(private standardsService: StandardsService,
    public dialogRef: MatDialogRef<AddStandardComponent>,
    private studentsService: StudentsService
  ) { }

  ngOnInit(): void {
    this.standards$ = this.standardsService.getStandards()    
  }

  addNewStudent(standard: string, name: string) {
    this.dialogRef.close();
    this.studentsService.createNewStudent(standard, name).subscribe()

  }


}
