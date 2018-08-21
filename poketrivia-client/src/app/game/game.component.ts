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
  updatesSubscription: Subscription;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.updatesSubscription = this.gameService
      .streamGame(this.roomName, (gameStore: GameStore) => {
        this.game = gameStore.retrieveGame(this.roomName);
      });
  }

  ngOnDestroy(): void {
    this.updatesSubscription.unsubscribe();
  }

  private get roomName(): string {
    return this.route.snapshot.params['roomName'];
  }

}
