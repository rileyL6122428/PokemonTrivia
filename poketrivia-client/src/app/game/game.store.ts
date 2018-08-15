import { Injectable } from '@angular/core';
import { Game } from './game.model';

@Injectable()
export class GameStore {

  private contents: Map<string, Game>;

  constructor() {
    this.contents = new Map<string, Game>();
  }

  deposit(game: Game): void {
    this.contents.set(game.roomName, game);
  }

  retrieveGame(roomName: string): Game {
    return this.contents.get(roomName);
  }

}
