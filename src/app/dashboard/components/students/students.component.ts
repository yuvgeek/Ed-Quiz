import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { StandardsService } from 'src/app/services/standards.service';
import { StudentsService } from 'src/app/services/students.service';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'action'];
  standards$ = new Observable<any>();
  students$ = new Observable<any>();

  standards = [];
  isLoading = true;
  selectedStandard: any;

  constructor(
    public dialog: MatDialog,
    private standardsService: StandardsService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getStandards();
    this.standardSelectedChange();
  }

  getStandards() {
    this.standards$ = this.standardsService
      .getStandards()
      .pipe(tap(() => (this.isLoading = false)));
  }

  standardSelectedChange() {
    this.isLoading = true;
    // fetch the students by standard
    this.students$ = this.studentsService
      .getStudentsByStandard(this.selectedStandard)
      .pipe(tap(() => (this.isLoading = false)));
  }

  addStudent() {
    this.dialog
      .open(AddStudentComponent)
      .afterClosed()
      // .pipe(tap(() => (this.isLoading = true)))
      .subscribe(() => {
        this.standardSelectedChange();
      });
  }
}
