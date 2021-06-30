import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizResultService {
  constructor(private http: HttpClient) {}

  submitQuiz(quizId: string, studentId: string, score: number) {
    const params = {
      operation: 'insert',
      schema: 'questionAnswers',
      table: 'quiz_results',
      records: [
        {
          quizId,
          studentId,
          score,
        },
      ],
    };

    return this.http.post(environment.HARPER_DB_HOST, params);
  }
}
