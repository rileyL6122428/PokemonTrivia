import { Component, Input, ViewEncapsulation } from '@angular/core';
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
  selectedPokemon: Pokemon;

  get pokemonChosen(): boolean {
    return !!this.selectedPokemon;
  }

  set answer(pokemon: Pokemon) {
    if (!this.selectedPokemon) {
      this.selectedPokemon = pokemon;
    }
  }

}
