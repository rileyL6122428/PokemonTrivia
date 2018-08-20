import { Component, Input } from '@angular/core';
import { Player } from '../../game/game.model';

@Component({
  selector: 'pkt-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent {

  @Input() players: Array<Player>;

}
