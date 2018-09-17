import { GamePhase, Game } from '../../game/game.model';

export class ProfessorOak {

  private _game: Game;

  private dialogueByPhase: Map<GamePhase, () => string> = new Map<GamePhase, () => string>()
    .set(
      'NOT_STARTED',
      () => `
        Your very own Pokémon trivia legend is about to unfold!
        A world of questions and answers with Pokémon awaits!
        We'll start soon!
      `
    )
    .set(
      'STARTED',
      () => `
        Let's go! Let's become the very best there ever was!
      `
    )
    .set(
      'ASKING_QUESTION',
      () => `
        QUESTION: ${this._game.questionDescription}
      `
    )
    .set(
      'REVEALING_ANSWER',
      () => `
        ANSWER: ${this._game.correctAnswer.name}!
      `
    )
    .set(
      'STAGING_NEXT_QUESTION',
      () => `
        Alright! Here comes the next question!
      `
    )
    .set(
      'ANNOUNCING_WINNERS',
      () => {
        debugger;
        return`
          And the winners are ... ${this._game.leaderNames}! Congrats!
        `;
      }
    );

  get dialogue(): string {
    return (this._game) ?
      this.dialogueByPhase.get(this._game.phase)() : '';
  }

  set game(game: Game) {
    this._game = game;
  }

}
