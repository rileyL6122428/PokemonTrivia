import { UnmappedPlayerScore, UnmappedGamePhase } from './game.http';

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

export type GamePhase = UnmappedGamePhase;
export type PlayerScore = UnmappedPlayerScore;
export type Point = 0 | 1;
