import { UnmappedPlayerScore } from './game.http';

export type GamePhase = 'NOT_STARTED' | 'STARTED';

export class Game {
  constructor(
    readonly phase: GamePhase,
    readonly roomName: string,
    readonly players: Array<Player>
  ) { }
}

export class Player {
  constructor(
    readonly name: string,
    readonly score: PlayerScore
  ) {}
}

export type PlayerScore = UnmappedPlayerScore;
export type Point = 0 | 1;
