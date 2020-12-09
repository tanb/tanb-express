import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Codable } from 'codable';

import { environment } from 'src/environments/environment';
import { ContactMe } from './contact-me.model';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
  }

  contactMe(body: {[key: string]: any}): Promise<ContactMe> {
    const params = new HttpParams();
    Object.keys(body).forEach((k) => {
      params.set(k, body[k]);
    });
    const path = '/index.html';
    return this.post(path, params);
  }

  private post(url: string, params: HttpParams): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http
      .post(url, params.toString(), options)
      .toPromise();
  }
}
