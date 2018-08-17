export type GamePhase = 'NOT_STARTED' | 'STARTED';

export class Game {
  constructor(
    readonly phase: GamePhase,
    readonly roomName: string
  ) { }
}
