import { Component, Input } from '@angular/core';

@Component({
  selector: 'pkt-poke-ball',
  templateUrl: './poke-ball.component.html',
  styleUrls: ['./poke-ball.component.scss']
})
export class PokeBallComponent {

  @Input('rolling') animateRoll: boolean;

}
