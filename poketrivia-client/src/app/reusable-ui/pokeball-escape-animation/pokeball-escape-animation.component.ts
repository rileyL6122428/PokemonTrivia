import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pkt-pokeball-escape-animation',
  templateUrl: './pokeball-escape-animation.component.html',
  styleUrls: ['./pokeball-escape-animation.component.scss']
})
export class PokeballEscapeAnimationComponent implements OnInit {

  @Input()
  animate: boolean;

  ngOnInit() {
    // setTimeout(() => this.animate = true, 1500);
  }

}
