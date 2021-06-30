import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { QuestionsService } from 'src/app/services/questions.service';
import { AddQuestionToQuizComponent } from '../add-question-to-quiz/add-question-to-quiz.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  questions$ = new Observable<any>();
  quizId: string = '';
  isLoading: boolean = true;
  refreshData$ = new BehaviorSubject<any>(true);

  constructor(
    private questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.questions$ = combineLatest([
      this.activatedRoute.params,
      this.refreshData$,
    ]).pipe(
      tap(([params]) => {
        this.isLoading = true;
        this.quizId = params.quizId;
      }),
      switchMap(([params]) =>
        this.questionsService.getQuestionsByQuizId(params.quizId)
      ),
      tap(() => (this.isLoading = false))
    );
  }

  getAnswer(options: any[]) {
    return options.find((el) => el.selected).name;
  }

  addQuestionToQuiz() {
    this.dialog
      .open(AddQuestionToQuizComponent, {
        data: { quizId: this.quizId },
        width: '500px',
      })
      .afterClosed()
      .subscribe(() => this.refreshData$.next(new Date()));
  }
}
