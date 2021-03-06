import { Injectable } from '@angular/core';
import { SessionHttp } from './session.http';
import { SessionServiceAdapter } from './session.adapter';
import { SessionStomp } from './session.stomp';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { Session } from './session.model';

@Injectable()
export class SessionService {

  private session: Session;

  constructor(
    private http: SessionHttp,
    private adapter: SessionServiceAdapter,
    private stomp: SessionStomp
  ) { }

  openConnections(): Observable<boolean> {
    return this.http.registerSession()
      .pipe(map((sessionPOJO: any) => this.adapter.mapFromPOJO(sessionPOJO)))
      .pipe(tap(((session: Session) => this.stomp.initializeConnection(session.id))))
      .pipe(tap((session: Session) => this.session = session))
      .pipe(map(() => true))
      .pipe(catchError(() => of(false)));
  }

  get username(): string {
    return this.session ? this.session.name : 'USERNAME_UNAVAILABLE';
  }

}
