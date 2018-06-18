import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon.model';

@Injectable()
export class PokemonStore {

  private contents: Map<string, Pokemon>;

  constructor() {
    this.contents = new Map<string, Pokemon>();
  }

  getByName(name: string): Pokemon {
    return this.contents.get(name);
  }

  deposit(pokemon: Pokemon): void {
    this.contents.set(pokemon.name, pokemon);
  }

  depositList(pokemonList: Array<Pokemon>): void {
    pokemonList.forEach(pokemon => this.deposit(pokemon));
  }

}
