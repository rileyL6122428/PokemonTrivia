import { Component, Input } from '@angular/core';
import { Point } from '../../game/game.model';

@Component({
  selector: 'pkt-point-counter',
  templateUrl: './point-counter.component.html',
  styleUrls: ['./point-counter.component.scss']
})
export class PointCounterComponent {

  @Input() point: Point;

}
