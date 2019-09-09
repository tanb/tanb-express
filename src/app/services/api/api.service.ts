import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Codable } from 'codable';

import { environment } from 'src/environments/environment';
import { ContactMe } from './contact-me.model';

@Injectable()
export class ApiService {
  private readonly apiVersion = 'v1';
  constructor(private http: HttpClient) {
  }

  contactMe(body: any): Promise<ContactMe> {
    const path = '/contactme';
    return this.post(ContactMe, this.url(path), body);
  }

  private url(path: string): string {
    return environment.apiServer + '/' + this.apiVersion + path;
  }

  private post<T extends typeof Codable>(klass: T, url: string, body: any): Promise<InstanceType<T>> {
    const options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
      })
    };
    return this.http
      .post<T>(url, body, options)
      .pipe(
        mergeMap(response => {
          return of(klass.decode(response));
        })
      )
      .toPromise();
  }
}
