import { Injectable } from '@angular/core';
import { HttpParamsOptions, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    const paramsOptions = <HttpParamsOptions>{fromObject: body};
    let params = new HttpParams(paramsOptions);
    const path = '/';
    return this.post(path, params);
  }

  private post(url: string, params: HttpParams): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    const requestBody = params.toString();
    return this.http
      .post(url, requestBody, options)
      .toPromise();
  }
}
