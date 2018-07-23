import { Observable } from 'rxjs/Observable';
import { Inject, Injectable } from '@angular/core';
import { roomConfigToken, RoomConfig } from './room.config';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { Room } from './room.model';
import { Session } from '../session/session.model';

@Injectable()
export class RoomHttp {

  constructor(
    private http: HttpClient,
    @Inject(roomConfigToken) private config: RoomConfig,
  ) { }

  getAll(): Observable<Array<UnmappedRoom>> {
    return this.http
      .get(this.config.http.GET_ALL)
      .pipe(
        map(response => response as Array<UnmappedRoom>)
      );
  }

}

export interface UnmappedRoom {
  mascotName: string;
}
