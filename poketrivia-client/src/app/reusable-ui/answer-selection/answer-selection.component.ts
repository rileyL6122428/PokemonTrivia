import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Game } from '../../game/game.model';
import { Pokemon } from '../../pokemon/pokemon.model';

@Component({
  selector: 'pkt-answer-selection',
  templateUrl: './answer-selection.component.html',
  styleUrls: ['./answer-selection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnswerSelectionComponent {

  @Input() game: Game;
  @Output() selection: EventEmitter<Pokemon>;
  selectedPokemon: Pokemon;
  closeOpenedPokeballs: boolean;
  private _rollSelectedPokeball: boolean;

  constructor() {
    this.selection = new EventEmitter<Pokemon>();
  }

  get pokemonChosen(): boolean {
    return !!this.selectedPokemon;
  }

  get correctAnswerChosen(): boolean {
    return this.game.phase === 'REVEALING_ANSWER';
  }

  set answer(pokemon: Pokemon) {
    if (!this.selectedPokemon) {
      this.selection.emit(pokemon);
      this.selectedPokemon = pokemon;
      setTimeout(() => this.closeOpenedPokeballs = true, 2600);
      setTimeout(() => this._rollSelectedPokeball = true, 3250);
    }
  }

  get rollSelectedPokeball(): boolean {
    return this._rollSelectedPokeball && this.game.phase === 'ASKING_QUESTION';
  }

}
