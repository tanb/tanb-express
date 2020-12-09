import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Codable } from 'codable';

import { environment } from 'src/environments/environment';
import { ContactMe } from './contact-me.model';

declare interface HttpParamsOptions {
  fromObject: {[key: string]: string}
}

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
        Accept: 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      responseType: 'text'
    };
    const requestBody = params.toString();
    return this.http
      .post(url, requestBody, options)
      .toPromise();
  }
}
