import { Component, Input } from '@angular/core';

@Component({
  selector: 'pkt-point-counter',
  templateUrl: './point-counter.component.html',
  styleUrls: ['./point-counter.component.scss']
})
export class PointCounterComponent {

  @Input('contains-point') containsPoint: boolean;

}
