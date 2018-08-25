import { Component, Input } from '@angular/core';
import { OpenablePokeball } from './poke-ball.model';

@Component({
  selector: 'pkt-poke-ball',
  templateUrl: './poke-ball.component.html',
  styleUrls: ['./poke-ball.component.scss']
})
export class PokeBallComponent {

  @Input('rolling') animateRoll: boolean;
  @Input() openable: boolean;

  pokeball: OpenablePokeball;

  constructor() {
    this.pokeball = new OpenablePokeball();
  }

  @Input()
  set shouldClose(shouldClose: boolean) {
    if (shouldClose && this.isOpen) {
      this.pokeball.close();
    }
  }

  toggleOpenClose(): void {
    if (this.openable) {
      this.pokeball.toggleOpenClose();
    }
  }

  get isOpen(): boolean {
    return this.pokeball.isOpen;
  }

  private get topCircleD(): string {
    return `
      M
        5 60
      C
        5 -10
        105 -10
        105 60

      C
        105 ${this.pokeball.topOpeningHeight}
        5 ${this.pokeball.topOpeningHeight}
        5 60
    `;
  }

  private get bottomCircleD(): string {
    return `
      M
        5 60
      C
        5 130
        105 130
        105 60
      C
        105 ${this.pokeball.bottomOpeningHeight}
        5 ${this.pokeball.bottomOpeningHeight}
        5 60
    `;
  }

  get buttonHeight(): number {
    return this.pokeball.buttonHeight;
  }

  get buttonRadiusY(): number {
    return this.pokeball.buttonRadiusY;
  }

}
