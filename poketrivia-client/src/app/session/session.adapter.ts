import { Injectable } from '@angular/core';
import { Session } from './session.model';

@Injectable()
export class SessionServiceAdapter {

  mapFromPOJO(sessionPOJO: any) {
    return new Session(
      sessionPOJO.id,
      sessionPOJO.name,
      new Date(sessionPOJO.lastUpdated)
    );
  }

}
