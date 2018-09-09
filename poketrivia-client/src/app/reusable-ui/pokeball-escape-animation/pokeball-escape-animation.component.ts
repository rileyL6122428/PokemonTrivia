import { Component, Input } from '@angular/core';

@Component({
  selector: 'pkt-pokeball-escape-animation',
  templateUrl: './pokeball-escape-animation.component.html',
  styleUrls: ['./pokeball-escape-animation.component.scss']
})
export class PokeballEscapeAnimationComponent {

  @Input()
  animate: boolean;

}
