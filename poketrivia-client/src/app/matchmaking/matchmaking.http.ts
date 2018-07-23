import { Injectable, Inject } from '@angular/core';
import { Room } from '../room/room.model';
import { Observable } from 'rxjs/Observable';
import { UnmappedRoom } from '../room/room.http';
import { matchmakingConfigToken, MatchmakingConfig } from './matchmaking.config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class MatchmakingHttp {

  constructor(
    private http: HttpClient,
    @Inject(matchmakingConfigToken) private config: MatchmakingConfig,
  ) { }

  join(room: Room): Observable<JoinRoomResponse> {
    return this
      .http
      .post(this.config.joinRoomPath(room.name), {})
      .pipe(map(response => response as JoinRoomResponse));
  }

}

export interface JoinRoomResponse {
  room: UnmappedRoom;
}
