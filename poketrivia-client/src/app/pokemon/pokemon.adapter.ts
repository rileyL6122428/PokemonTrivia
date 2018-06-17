import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { UnmappedPokemon } from './pokemon.http';

@Injectable()
export class PokemonAdapter {

  mapPokemon(unmappedPokemon: UnmappedPokemon): Pokemon {
    return new Pokemon(
      unmappedPokemon.name,
      unmappedPokemon.iconFindersSVG,
      unmappedPokemon.defaultSVG
    );
  }

}
