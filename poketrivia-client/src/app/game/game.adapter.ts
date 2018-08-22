import { Injectable } from '@angular/core';
import { UnmappedGame, UnmappedPlayerScore, UnmappedQuestion } from './game.http';
import { Game, Player, Question } from './game.model';
import { Pokemon } from '../pokemon/pokemon.model';
import { PokemonStore } from '../pokemon/pokemon.store';

@Injectable()
export class GameAdapter {

  constructor(
    private pokemonStore: PokemonStore
  ) { }

  map(unmappedGame: UnmappedGame): Game {
    return new Game(
      unmappedGame.phase,
      unmappedGame.roomName,
      this.mapPlayers(unmappedGame.playerNamesToScores),
      this.mapQuestion(unmappedGame)
    );
  }

  private mapPlayers(unmappedPlayers: { [name: string]: UnmappedPlayerScore }): Array<Player> {
    return Object
      .entries(unmappedPlayers)
      .map(this.mapPlayer)
      .sort(this.byScoreDescending);
  }

  private mapPlayer(playerTuple: [string, UnmappedPlayerScore]): Player {
    const [name, score] = playerTuple;
    return new Player(name, score);
  }

  private byScoreDescending(playerA: Player, playerB: Player) {
    return playerB.score - playerA.score;
  }

  private mapQuestion(game: UnmappedGame): Question {
    return game.phase === 'ASKING_QUESTION' ? new Question(
      game.currentQuestion.description,
      this.mapAnswers(game.currentQuestion)
    ) : null;
  }

  private mapAnswers(question: UnmappedQuestion): Pokemon[] {
    return question.shuffledAnswers.map(
      pokemonName =>  this.pokemonStore.getByName(pokemonName)
    );
  }
}

