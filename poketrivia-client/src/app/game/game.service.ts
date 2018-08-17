import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { GameHttpClient, UnmappedGame } from './game.http';
import { GameAdapter } from './game.adapter';
import { GameStore } from './game.store';
import { Game } from './game.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/Observable/of';

@Injectable()
export class GameService {

  constructor(
    private http: GameHttpClient,
    private adapter: GameAdapter,
    private store: GameStore
  ) { }

  fetchGame(roomName: string): Observable<boolean> {
    return this.http
      .fetchGame(roomName)
      .pipe(
        map((game: UnmappedGame) => this.adapter.map(game)),
        tap((game: Game) => this.store.deposit(game)),
        map(() => true),
        catchError(() => of(false))
      );
  }

  get gameStorageUpdates(): Observable<GameStore> {
    return this.store.updates;
  }

}
