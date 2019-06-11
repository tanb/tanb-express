import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ContactMeModel } from './contact-me.model';

@Injectable()
export class ApiService {
  private readonly apiVersion = 'v1';
  constructor(private http: HttpClient) {
  }

  contactMe(body: any): Promise<ContactMeModel> {
    const path = '/contactme';
    return this.post<ContactMeModel>(this.url(path), body);
  }

  private url(path: string): string {
    return environment.apiServer + '/' + this.apiVersion + path;
  }

  private post<T>(url: string, body: any): Promise<T> {
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
      })
    };
    return this.http.post<T>(url, body, options).toPromise();
  }
}
