import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { QuizService } from 'src/app/services/quiz.service';
import { StandardsService } from 'src/app/services/standards.service';
import { StudentsService } from 'src/app/services/students.service';
import { AddQuestionToQuizComponent } from '../add-question-to-quiz/add-question-to-quiz.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  @ViewChild('addQuizTemplate')
  addQuizTemplate!: TemplateRef<any>;

  @ViewChild('shareQuizTemplate')
  shareQuizTemplate!: TemplateRef<any>;

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    subject: new FormControl(),
    description: new FormControl(),
  });
  dialogRef!: MatDialogRef<any, any>;
  quizList$ = new Observable<any>();
  isLoading = true;

  standards$ = new Observable<any>();
  students$ = new Observable<any>();
  selectedStandard: any;
  selectedStudent: any;
  refreshData$ = new BehaviorSubject<any>(true);

  constructor(
    public dialog: MatDialog,
    private quizService: QuizService,
    private standardsService: StandardsService,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getQuiz();
    this.getStandards();
  }

  getQuiz() {
    this.quizList$ = this.refreshData$.pipe(
      switchMap(() => this.quizService.getQuiz()),
      tap(() => (this.isLoading = false))
    );
  }

  addQuiz() {
    this.dialogRef = this.dialog.open(this.addQuizTemplate, {
      width: '500px',
    });
  }

  addNewQuiz(name: string, subject: string, description: string) {
    this.quizService.createNewQuiz(name, subject, description).subscribe(() => {
      this.dialogRef.close();
      this.refreshData$.next(new Date());
    });
  }

  addQuestionToQuiz(quizId: string) {
    this.dialog.open(AddQuestionToQuizComponent, {
      data: { quizId },
      width: '500px',
    });
  }

  shareQuiz(quizId: string) {
    this.dialog.open(this.shareQuizTemplate, {
      data: { quizId },
    });
  }

  getShareURL(quizId: string) {
    const url =
      window.location.origin + `/attend/${this.selectedStudent}/${quizId}`;
    return url;
  }

  getStandards() {
    this.standards$ = this.standardsService.getStandards();
  }

  standardSelectedChange() {
    // fetch the students by standard
    this.students$ = this.studentsService.getStudentsByStandard(
      this.selectedStandard
    );
  }
}
