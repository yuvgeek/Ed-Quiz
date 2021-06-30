import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createNewQuiz(name: string, subject: string, description: string) {
    const params = {
      operation: 'insert',
      schema: 'questionAnswers',
      table: 'quiz',
      records: [
        {
          name,
          subject,
          description,
          user_id: this.authService.userDetails.uid,
        },
      ],
    };

    return this.http.post(environment.HARPER_DB_HOST, params);
  }

  getQuiz() {
    const params = {
      operation: 'sql',
      sql: `SELECT * FROM questionAnswers.quiz WHERE user_id = '${this.authService.userDetails.uid}' ORDER BY __createdtime__ ASC`,
    };

    return this.http.post(environment.HARPER_DB_HOST, params);
  }

  getQuizById(quizId: string) {
    const params = {
      operation: 'search_by_conditions',
      schema: 'questionAnswers',
      table: 'quiz',
      operator: 'and',
      get_attributes: ['*'],
      conditions: [
        {
          search_attribute: 'id',
          search_type: 'equals',
          search_value: [quizId],
        },
      ],
    };

    return this.http.post(environment.HARPER_DB_HOST, params);
  }
}
