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
  rollSelectedPokeball: boolean;

  constructor() {
    this.selection = new EventEmitter<Pokemon>();
  }

  get pokemonChosen(): boolean {
    return !!this.selectedPokemon;
  }

  set answer(pokemon: Pokemon) {
    if (!this.selectedPokemon) {
      this.selection.emit(pokemon);
      this.selectedPokemon = pokemon;
      setTimeout(() => this.closeOpenedPokeballs = true, 2600);
      setTimeout(() => this.rollSelectedPokeball = true, 3250);
    }
  }

}
