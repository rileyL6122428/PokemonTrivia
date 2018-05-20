import { Injectable } from '@angular/core';
import { SessionServiceConfig } from './session.service.config';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SessionService {

  constructor(
    private config: SessionServiceConfig,
    private http: HttpClient
  ) { }

  registerSession(): Observable<any> {
    return this.http.post(this.config.registerSessionEndpoint, {})
  }

}
