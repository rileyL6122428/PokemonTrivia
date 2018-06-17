import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { UnmappedPokemon } from './pokemon.http';

@Injectable()
export class PokemonAdapter {

  mapPokemons(unmappedPokemons: Array<UnmappedPokemon>): Array<Pokemon> {
    return unmappedPokemons.map(unmapped => this.mapPokemon(unmapped));
  }

  mapPokemon(unmappedPokemon: UnmappedPokemon): Pokemon {
    return new Pokemon(
      unmappedPokemon.name,
      unmappedPokemon.iconFindersSVG,
      unmappedPokemon.defaultSVG
    );
  }

}
