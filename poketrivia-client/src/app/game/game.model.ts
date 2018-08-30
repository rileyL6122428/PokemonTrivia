import { UnmappedPlayerScore, UnmappedGamePhase } from './game.http';
import { Pokemon } from '../pokemon/pokemon.model';

export class Game {
  constructor(
    readonly phase: GamePhase,
    readonly roomName: string,
    readonly players: Array<Player>,
    readonly currentQuestion: Question,
    readonly correctAnswer: Pokemon
  ) { }

  get questionDescription(): string {
    return this.currentQuestion ? this.currentQuestion.description : '';
  }

  get inQuestionPhase(): boolean {
    return this.phase === 'ASKING_QUESTION' || this.phase === 'REVEALING_ANSWER';
  }

  get currentQuestionAnswers(): Pokemon[] {
    return this.currentQuestion.answers;
  }
}

export class Player {
  constructor(
    readonly name: string,
    readonly score: PlayerScore
  ) {}
}

export class Question {
  constructor(
    readonly description: string,
    readonly answers: Pokemon[]
  ) { }
}

export type GamePhase = UnmappedGamePhase;
export type PlayerScore = UnmappedPlayerScore;
export type Point = 0 | 1;
