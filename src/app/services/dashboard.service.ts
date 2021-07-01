import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  public refreshStats = new BehaviorSubject<boolean>(true);
  public refreshStats$ = this.refreshStats.asObservable();

  constructor(private http: HttpClient) {}

  getStudentsCount(userId: string) {
    const params = {
      operation: 'sql',
      sql: `SELECT COUNT(id) as studentsCount FROM questionAnswers.students WHERE user_id = '${userId}'`,
    };

    return this.http.post(environment.HARPER_DB_HOST, params).pipe(
      map((res: any) => {
        return res[0].studentsCount
      })
    );
  }

  getStandardsCount(userId: string) {
    const params = {
      operation: 'sql',
      sql: `SELECT COUNT(id) as standardsCount FROM questionAnswers.standards WHERE user_id = '${userId}'`,
    };

    return this.http.post(environment.HARPER_DB_HOST, params).pipe(
      map((res: any) => {
        return res[0].standardsCount
      })
    );
  }

  getQuizCount(userId: string) {
    const params = {
      operation: 'sql',
      sql: `SELECT COUNT(id) as quizCount FROM questionAnswers.quiz WHERE user_id = '${userId}'`,
    };

    return this.http.post(environment.HARPER_DB_HOST, params).pipe(
      map((res: any) => {
        return res[0].quizCount
      })
    );
  }

}
