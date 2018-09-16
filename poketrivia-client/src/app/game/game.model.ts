import { UnmappedPlayerScore, UnmappedGamePhase } from './game.http';
import { Pokemon } from '../pokemon/pokemon.model';

export class Game {

  private _leaders: Array<Player>;
  private _leaderNames: string;
  private _maxScore: number;

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

  get leaders(): Array<Player> {
    return this._leaders || (this._leaders = this.computeLeaders());
  }

  private computeLeaders(): Array<Player> {
    return this.players.filter(player => player.score === this.maxScore);
  }

  get leaderNames(): string {
    return this._leaderNames || (this._leaderNames = this.computeLeadersNames());
  }

  private computeLeadersNames(): string {
    return this.leaders.map(leader => leader.name).join(', ');
  }

  private get maxScore(): number {
    return (this._maxScore === undefined) ?
      this._maxScore : this._maxScore = this.computeMaxScore();
  }

  private computeMaxScore(): number {
    let maxScore = 0;
    this.players.forEach((player) => {
      if (player.score > this._maxScore) {
        maxScore = player.score;
      }
    });
    return maxScore;
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
