import { Component, Input, ViewEncapsulation, Output, EventEmitter, OnChanges } from '@angular/core';
import { Game } from '../../game/game.model';
import { Pokemon } from '../../pokemon/pokemon.model';

@Component({
  selector: 'pkt-answer-selection',
  templateUrl: './answer-selection.component.html',
  styleUrls: ['./answer-selection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnswerSelectionComponent implements OnChanges {

  @Input() game: Game;
  @Output() selection: EventEmitter<Pokemon>;
  selectedPokemon: Pokemon;
  closeOpenedPokeballs: boolean;
  private _rollSelectedPokeball: boolean;
  private selectedPokemonEscaped: boolean;

  constructor() {
    this.selection = new EventEmitter<Pokemon>();
  }

  ngOnChanges(): void {
    if (this.incorrectAnswerChosen) {
      // TODO extract this animation flag to stylesheet
      setTimeout(() => this.selectedPokemonEscaped = true, 600);
    }
  }

  get pokemonChosen(): boolean {
    return !!this.selectedPokemon;
  }

  get correctAnswerChosen(): boolean {
    return this.game.phase === 'REVEALING_ANSWER' &&
    this.game.correctAnswer === this.selectedPokemon;
  }

  get incorrectAnswerChosen(): boolean {
    return this.game.phase === 'REVEALING_ANSWER' &&
    this.game.correctAnswer !== this.selectedPokemon;
  }

  set answer(pokemon: Pokemon) {
    if (!this.selectedPokemon) {
      this.selection.emit(pokemon);
      this.selectedPokemon = pokemon;
      // TODO UNIFY animations listed here and animations listed in
      // answer-selection.component.animations.scss
      setTimeout(() => this.closeOpenedPokeballs = true, 2600);
      setTimeout(() => this._rollSelectedPokeball = true, 3250);
    }
  }

  get rollSelectedPokeball(): boolean {
    return this._rollSelectedPokeball && this.game.phase === 'ASKING_QUESTION';
  }

}
