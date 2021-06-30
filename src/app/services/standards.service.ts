import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StandardsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createNewStandard(name: string) {
    const params = {
      operation: 'insert',
      schema: 'questionAnswers',
      table: 'standards',
      records: [
        {
          name,
          user_id: this.authService.userDetails.uid
        },
      ],
    };

    return this.http.post(environment.HARPER_DB_HOST, params);
  }

  getStandards() {
    const params = {
      operation: 'search_by_conditions',
      schema: 'questionAnswers',
      table: 'standards',
      operator: 'and',
      get_attributes: ['*'],
      conditions: [
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

  deleteStandard(id: string) {
    const params = {
      operation: 'delete',
      table: 'standards',
      schema: 'questionAnswers',
      hash_values: [id],
    };

    return this.http.post(environment.HARPER_DB_HOST, params);
  }
}
