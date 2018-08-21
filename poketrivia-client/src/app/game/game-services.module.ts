import { NgModule } from '@angular/core';
import { GameAdapter } from './game.adapter';
import { GameService } from './game.service';
import { GameHttpClient } from './game.http';
import { GameStore } from './game.store';
import { gameConfigToken, GameConfig } from './game.config';
import { GameStompClient } from './game.stomp';

export const gameConfig: GameConfig = {
  HTTP: {
    GET_GAME: (roomName) => `/game/${roomName}`
  }
};

@NgModule({
  providers: [
    GameAdapter,
    GameHttpClient,
    GameStore,
    GameService,
    GameStompClient,
    {
      provide: gameConfigToken,
      useValue: gameConfig
    }
  ]
})
export class GameServicesModule { }
