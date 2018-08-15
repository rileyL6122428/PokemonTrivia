import { Injectable } from '@angular/core';
import { UnmappedGame } from './game.http';
import { Game } from './game.model';

@Injectable()
export class GameAdapter {

  map(unmappedGame: UnmappedGame): Game {
    return new Game(
      unmappedGame.phase,
      unmappedGame.roomName
    );
  }

}
