import { Injectable } from '@angular/core';
import { UnmappedGame, UnmappedPlayerScore } from './game.http';
import { Game, Player } from './game.model';

@Injectable()
export class GameAdapter {

  map(unmappedGame: UnmappedGame): Game {
    return new Game(
      unmappedGame.phase,
      unmappedGame.roomName,
      this.mapPlayers(unmappedGame.playerNamesToScores)
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
}

