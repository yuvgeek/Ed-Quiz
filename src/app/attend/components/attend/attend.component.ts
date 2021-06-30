import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizResultService } from 'src/app/services/quiz-result.service';
import { QuizService } from 'src/app/services/quiz.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-attend',
  templateUrl: './attend.component.html',
  styleUrls: ['./attend.component.scss'],
})
export class AttendComponent implements OnInit {
  constructor(
    private questionsService: QuestionsService,
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private studentsService: StudentsService,
    public dialog: MatDialog,
    private quizResultService: QuizResultService
  ) {}

  quizDetails$ = new Observable<any>();
  quizId: string = '';
  studentId: string = '';
  isLoading: boolean = true;
  answeredQuestion: any[] = [];
  @ViewChild('showScoreTemplate')
  showScoreTemplate!: TemplateRef<any>;
  isQuizAttended: boolean = false;

  ngOnInit(): void {
    this.quizDetails$ = this.activatedRoute.params.pipe(
      tap((params) => {
        this.isLoading = true;
        this.quizId = params.quizId;
        this.studentId = params.userId;
      }),
      switchMap((params) =>
        combineLatest([
          this.studentsService.getStudentInfo(params.userId),
          this.quizService.getQuizById(params.quizId),
          this.questionsService.getQuestionsByQuizId(params.quizId),
        ])
      ),
      map(([studentInfo, quizInfo, questions]: [any, any, any]) => ({
        studentInfo,
        ...quizInfo[0],
        questions,
      })),
      tap(() => (this.isLoading = false))
    );
  }

  submitQuiz(questions: any[]) {
    const scoredMark = this.answeredQuestion.reduce((acc, curr, index) => {
      const isAnswerCorrect = questions[index].options.find(
        (el: any) => el.name === curr
      ).selected;
      if (isAnswerCorrect) {
        acc += 1;
      }
      return acc;
    }, 0);
    this.dialog.open(this.showScoreTemplate, {
      data: { scoredMark, totalQuestion: questions?.length ?? 0 },
    });
    this.isQuizAttended = true;
    this.quizResultService
      .submitQuiz(this.quizId, this.studentId, scoredMark)
      .subscribe(
        () => null,
        (err) => alert(err)
      );
  }
}
