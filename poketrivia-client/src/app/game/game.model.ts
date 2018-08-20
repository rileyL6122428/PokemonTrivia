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

export type PlayerScore = 0 | 1 | 2 | 3 | 4 | 5 | 6;
