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
import { GameStompClient } from './game.stomp';
import { Subscription } from 'rxjs/Subscription';
import { Pokemon } from '../pokemon/pokemon.model';

@Injectable()
export class GameService {

  constructor(
    private http: GameHttpClient,
    private stomp: GameStompClient,
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

  storeGameUpdates(roomName: string): Observable<GameStore> {
    return this.stomp
      .gameUpdates(roomName)
      .pipe(
        map((game: UnmappedGame) => this.adapter.map(game)),
        tap((game: Game) => this.store.deposit(game)),
        map(() => this.store)
      );
  }

  streamGame(roomName: string, storeListener: (GameStore) => void): Subscription {
    storeListener(this.store);

    this.fetchGame(roomName)
      .subscribe((successful) => {
        if (successful) { storeListener(this.store); }
      });

    return this.storeGameUpdates(roomName)
      .subscribe((store) => storeListener(store));
  }

  submitAnswer(roomName: string, pokemon: Pokemon): Observable<any> {
    return this.http.submitAnswer(roomName, pokemon);
  }
}
