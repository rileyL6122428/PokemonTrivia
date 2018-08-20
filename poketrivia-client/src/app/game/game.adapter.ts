import { Injectable } from '@angular/core';
import { UnmappedGame, UnmappedPlayerScore } from './game.http';
import { Game, Player } from './game.model';

@Injectable()
export class GameAdapter {

  map(unmappedGame: UnmappedGame): Game {
    debugger
    return new Game(
      unmappedGame.phase,
      unmappedGame.roomName,
      this.mapPlayers(unmappedGame.playerNamesToScores)
    );
  }

  private mapPlayers(unmappedPlayers: { [name: string]: UnmappedPlayerScore }): Array<Player> {
    return Object
      .entries(unmappedPlayers)
      .map((playerTuple: [ string, UnmappedPlayerScore ]) => new Player(
        playerTuple[0],
        playerTuple[1]
      ))
      .sort(this.byScoreDescending);
  }

  private byScoreDescending(playerA: Player, playerB: Player) {
    return playerB.score - playerA.score;
  }
}

