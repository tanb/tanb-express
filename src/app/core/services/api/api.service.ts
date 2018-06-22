import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientService } from './client.service';
import { ContactMeModel } from './contact-me.model';

@Injectable()
export class ApiService {

  constructor(private client: ClientService) {
  }

  contactMe(body: URLSearchParams): Observable<ContactMeModel> {
    let path = '/contactme';
    return this.client.post(path, body).pipe(
      map(response => Object.assign(new ContactMeModel(), response.json))
    );
  }
}
