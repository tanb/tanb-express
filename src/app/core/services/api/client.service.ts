import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, Request,
         RequestOptionsArgs, BaseRequestOptions,
         Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable()
export class ClientService {
  private readonly apiVersion = 'v1';

  constructor(private http: Http) {
  }

  private url(path: string): string {
    return environment.apiServer + '/' + this.apiVersion + path;
  }

  private headers(): Headers {
    return new Headers({
      'Content-Type': 'application/json'
    });
  }

  get(path: string, params?: any, options?: RequestOptionsArgs): Observable<Response> {
    const request = new Request(Object.assign({
      method: RequestMethod.Get,
      headers: this.headers,
      url: this.url(path),
      params: params
    }, options || {}));
    return this.http.request(request);
  }

  post(path: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    const request = new Request(Object.assign({
      method: RequestMethod.Post,
      headers: this.headers,
      url: this.url(path),
      body: body
    }, options || {}));
    return this.http.request(request);
  }
}
