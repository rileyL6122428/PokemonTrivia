import { Injectable } from '@angular/core';
import { SessionConfig } from './session.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionHttp {

  constructor(
    private config: SessionConfig,
    private http: HttpClient
  ) { }

  registerSession(): Observable<any> {
    return this.http.post(this.config.registerSessionEndpoint, {});
  }

}
