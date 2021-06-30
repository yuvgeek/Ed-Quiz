import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getStudentsByStandard(standardId: string) {
    const params = {
      operation: 'search_by_conditions',
      schema: 'questionAnswers',
      table: 'students',
      operator: 'and',
      get_attributes: ['*'],
      conditions: [
        {
          search_attribute: 'standard_id',
          search_type: 'equals',
          search_value: [standardId],
        },
        {
          search_attribute: 'user_id',
          search_type: 'equals',
          search_value: [this.authService.userDetails.uid],
        },
      ],
    };
    return this.http.post(environment.HARPER_DB_HOST, params).pipe(
      map((data: any) =>
        data.map((item: any, index: number) => ({
          ...item,
          position: index + 1,
        }))
      )
    );
  }

  createNewStudent(standard_id: string, name: string) {
    const params = {
      operation: 'insert',
      schema: 'questionAnswers',
      table: 'students',
      records: [
        {
          standard_id,
          name,
          user_id: this.authService.userDetails.uid,
        },
      ],
    };

    return this.http.post(environment.HARPER_DB_HOST, params);
  }
  getStudentInfo(userId: string) {
    const params = {
      operation: 'search_by_conditions',
      schema: 'questionAnswers',
      table: 'students',
      operator: 'and',
      get_attributes: ['*'],
      conditions: [
        {
          search_attribute: 'id',
          search_type: 'equals',
          search_value: [userId],
        },
      ],
    };

    return this.http.post(environment.HARPER_DB_HOST, params).pipe(
      map((data: any) =>
        data.map((item: any, index: number) => ({
          ...item,
          position: index + 1,
        }))
      )
    );
  }
}
