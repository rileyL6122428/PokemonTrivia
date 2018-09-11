import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { GamePhase } from './game.model';
import { gameConfigToken, GameConfig } from './game.config';
import { Pokemon } from '../pokemon/pokemon.model';

@Injectable()
export class GameHttpClient {

  constructor(
    private http: HttpClient,
    @Inject(gameConfigToken) private config: GameConfig
  ) { }

  fetchGame(roomName: string): Observable<UnmappedGame> {
    return this.http
      .get(this.config.HTTP.GET_GAME(roomName))
      .pipe(
        map(response => response as UnmappedGame)
      );
  }

  submitAnswer(roomName: string, pokemon: Pokemon): Observable<any> {
    return this.http
      .post(
        this.config.HTTP.SUBMIT_ANSWER(roomName),
        pokemon.name
      );
  }

}

export interface UnmappedGame {
  phase: string & GamePhase;
  roomName: string;
  playerNamesToScores: { [name: string]: UnmappedPlayerScore };
  currentQuestion: UnmappedQuestion;
  correctAnswer: string;
}

export interface UnmappedQuestion {
  description: string;
  shuffledAnswers: string[];
}

export type UnmappedPlayerScore = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type UnmappedGamePhase =
  'NOT_STARTED' |
  'STARTED' |
  'ASKING_QUESTION' |
  'REVEALING_ANSWER' |
  'READY_FOR_NEXT_QUESTION';
