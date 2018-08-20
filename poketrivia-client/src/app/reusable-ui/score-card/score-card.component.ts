import { Component, Input } from '@angular/core';
import { Player } from '../../game/game.model';

@Component({
  selector: 'pkt-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent {

  name: string;
  points: Array<0 | 1>;

  @Input()
  set player(player: Player) {
    this.name = player.name;
    this.score = player.score;
  }

  private set score(pointTotal: number) {
    this.points = Array(6).fill(0);
    for (let pointIndex = 0; pointIndex < pointTotal; pointIndex++) {
      this.points[pointIndex] = 1;
    }
  }

}
