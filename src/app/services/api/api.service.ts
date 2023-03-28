import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ContactMe } from './contact-me.model';

declare interface HttpParamsOptions {
  fromObject: {[key: string]: string};
}

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
  }

  contactMe(body: {[key: string]: any}): Promise<ContactMe> {
    const paramsOptions = {fromObject: body} as HttpParamsOptions;
    const params = new HttpParams(paramsOptions);
    const path = '/';
    return this.post(path, params);
  }

  private post(url: string, params: HttpParams): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        Accept: 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      responseType: 'text' as 'json'
    };
    const requestBody = params.toString();
    return this.http
      .post(url, requestBody, options)
      .toPromise();
  }
}
