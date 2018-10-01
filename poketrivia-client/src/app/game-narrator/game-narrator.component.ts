import { Component, Input } from '@angular/core';
import { ProfessorOak } from '../reusable-ui/professor-oak/professor-oak.model';
import { Game } from '../game/game.model';
import { DialogueTimer } from './dialogue-timer.model';


@Component({
  selector: 'pkt-game-narrator',
  templateUrl: './game-narrator.component.html',
  styleUrls: ['./game-narrator.component.scss']
})
export class GameNarratorComponent {

  private professorOak: ProfessorOak;
  private dialogueTimer: DialogueTimer;

  constructor() {
    this.professorOak = new ProfessorOak();
  }

  @Input()
  set game(game: Game) {
    this.professorOak.game = game;
  }

}
