import { Injectable } from '@angular/core';
import { StompRService } from '@stomp/ng2-stompjs';
import { UnmappedGame } from './game.http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import * as Stomp from '@stomp/stompjs';

@Injectable()
export class GameStompClient {

  constructor(
    private stompService: StompRService,
  ) { }

  gameUpdates(roomName: string): Observable<UnmappedGame> {
    return this.stompService
      .subscribe(`/topic/game/${roomName}`)
      .pipe(
        map((message: Stomp.Message) => JSON.parse(message.body) as UnmappedGame)
      );
  }

}
