import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StandardsService } from 'src/app/services/standards.service';

@Component({
  selector: 'app-add-standard',
  templateUrl: './add-standard.component.html',
  styleUrls: ['./add-standard.component.scss']
})
export class AddStandardComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl()
  });

  constructor(private standardsService: StandardsService,
    public dialogRef: MatDialogRef<AddStandardComponent>,
  ) { }

  ngOnInit(): void {
  }

  addNewStandard(name: string) {
    this.dialogRef.close();
    this.standardsService.createNewStandard(name).subscribe()
  }

}
