import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ContactMeModel } from './contact-me.model';

@Injectable()
export class ApiService {
  private readonly apiVersion = 'v1';

  private url(path: string): string {
    return environment.apiServer + '/' + this.apiVersion + path;
  }

  constructor(private http: HttpClient) {
  }

  contactMe(body: any): Observable<ContactMeModel> {
    const path = '/contactme';
    return this.post<ContactMeModel>(this.url(path), body);
  }

  private post<T>(url: string, body: any) {
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    };
    return this.http.post<T>(url, body, options);
  }
}
