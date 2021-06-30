import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-add-question-to-quiz',
  templateUrl: './add-question-to-quiz.component.html',
  styleUrls: ['./add-question-to-quiz.component.scss'],
})
export class AddQuestionToQuizComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { quizId: string },
    private formBuilder: FormBuilder,
    private questionsService: QuestionsService,
    public dialogRef: MatDialogRef<AddQuestionToQuizComponent>,

  ) { }

  arrayItems!: {
    id: number;
    title: string;
  }[];

  form: FormGroup = this.formBuilder.group({
    question: '',
    options: this.formBuilder.array([this.createItem()]),
  });

  ngOnInit(): void {
    console.log(this.data);
  }

  createItem() {
    return this.formBuilder.group({
      name: '',
      selected: null,
    });
  }

  get options() {
    return this.form.get('options') as FormArray;
  }

  addOption() {
    (this.form.controls['options'] as FormArray).push(this.createItem());
  }

  deleteOption(index: number) {
    this.options.removeAt(index);
  }

  addNewQuestToQuiz() {
    console.log(this.form.value);
    this.questionsService.createQuestionToQuiz(this.form.value, this.data.quizId).subscribe(
      () => {
        this.dialogRef.close();
      },
      () => {

      }
    )
  }

  updateOptionSelectStatus(index: number) {
    this.options.setValue(
      this.options.value.map((el: any, i: number) => ({
        ...el,
        selected: i === index ? el.selected : false,
      }))
    );
  }
}
