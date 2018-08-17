import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from './game.service';
import { ActivatedRoute } from '@angular/router';
import { GameStore } from './game.store';
import { Game } from './game.model';
import { ProfessorOak } from '../reusable-ui/professor-oak/professor-oak.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pkt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game;
  storeSubscription: Subscription;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listenForGameUpdates();
    this.fetchGame();
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  private listenForGameUpdates(): void {
    this.storeSubscription = this.gameService
      .gameStorageUpdates
      .subscribe((store: GameStore) => {
        this.game = store.retrieveGame(this.roomName);
      });
  }

  private fetchGame(): void {
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
