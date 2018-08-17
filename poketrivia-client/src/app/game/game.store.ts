import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameStore {

  private contents: Map<string, Game>;
  private updateEmitter: Subject<GameStore>;

  constructor() {
    this.contents = new Map<string, Game>();
    this.updateEmitter = new Subject<GameStore>();
  }

  deposit(game: Game): void {
    this.contents.set(game.roomName, game);
    this.updateEmitter.next(this);
  }

  retrieveGame(roomName: string): Game {
    return this.contents.get(roomName);
  }

  get updates(): Observable<GameStore> {
    return this.updateEmitter;
  }

}
