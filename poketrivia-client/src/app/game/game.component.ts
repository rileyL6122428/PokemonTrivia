import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { ActivatedRoute } from '@angular/router';
import { GameStore } from './game.store';
import { Game } from './game.model';

@Component({
  selector: 'pkt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private game: Game;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.gameService
      .gameStorageUpdates
      .subscribe((store: GameStore) => {
        this.game = store.retrieveGame(this.roomName);
      });

    this.gameService
      .fetchGame(this.roomName)
      .subscribe((wasSuccessful: boolean) => {
        console.log(`fetched game: ${wasSuccessful}`);
      });
  }

  private get roomName(): string {
    return this.route.snapshot.params['roomName'];
  }

}
