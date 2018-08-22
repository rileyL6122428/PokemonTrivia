import { Component, Input } from '@angular/core';
import { Game } from '../../game/game.model';

@Component({
  selector: 'pkt-answer-selection',
  templateUrl: './answer-selection.component.html',
  styleUrls: ['./answer-selection.component.scss']
})
export class AnswerSelectionComponent {

  @Input() game: Game;

}
