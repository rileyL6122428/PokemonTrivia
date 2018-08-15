import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { ActivatedRoute } from '@angular/router';
import { GameStore } from './game.store';
import { Game } from './game.model';
import { ProfessorOak } from '../reusable-ui/professor-oak/professor-oak.model';

@Component({
  selector: 'pkt-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  professorOak: ProfessorOak;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) {
    this.professorOak = new ProfessorOak();
  }

  ngOnInit(): void {
    const that = this;
    this.gameService
      .gameStorageUpdates
      .subscribe((store: GameStore) => {
        debugger
        console.log(that);
        this.game = store.retrieveGame(this.roomName);
        this.professorOak.game = this.game;
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
