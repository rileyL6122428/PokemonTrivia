import { GamePhase, Game } from '../../game/game.model';

export class ProfessorOak {

  private _game: Game;

  private dialogueByPhase: Map<GamePhase, string> = new Map<GamePhase, string>()
    .set(
      'NOT_STARTED',
      `
        Your very own Pokémon trivia legend is about to unfold!
        A world of questions and answers with Pokémon awaits!
        We'll start soon!
      `
    )
    .set(
      'STARTED',
      `
        Let's go! Let's become the very best there ever was!
      `
    );

  get dialogue(): string {
    return (this._game) ? this.dialogueByPhase.get(this._game.phase) : '';
  }

  set game(game: Game) {
    this._game = game;
  }

}
