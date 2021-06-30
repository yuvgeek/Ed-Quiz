import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  createQuestionToQuiz(
    { question, options }: { question: string; options: any[] },
    quizId: string
  ) {
    const params = {
      operation: 'insert',
      schema: 'questionAnswers',
      table: 'questions',
      records: [
        {
          question,
          options,
          quizId,
        },
      ],
    };

    return this.http.post(environment.HARPER_DB_HOST, params);
  }

  getQuestionsByQuizId(quizId: string) {
    const params = {
      operation: 'search_by_conditions',
      schema: 'questionAnswers',
      table: 'questions',
      operator: 'and',
      get_attributes: ['*'],
      conditions: [
        {
          search_attribute: 'quizId',
          search_type: 'equals',
          search_value: [quizId],
        },
      ],
    };

    return this.http
      .post(environment.HARPER_DB_HOST, params)
      .pipe(
        map((data: any) =>
          data.map((item: any, index: number) => ({
            ...item,
            position: index + 1,
          }))
        )
      );
  }
}
