import { PokemonAdapter } from './pokemon.adapter';
import { TestBed } from '@angular/core/testing';
import { UnmappedPokemon } from './pokemon.http';
import { Pokemon } from './pokemon.model';

describe('PokemonAdapter', () => {
  let pokemonAdapter: PokemonAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PokemonAdapter ]
    });

    pokemonAdapter = TestBed.get(PokemonAdapter);
  });

  describe('#mapPokemon', () => {

    let unmapped: UnmappedPokemon;

    beforeEach(() => {
      unmapped = {
        name: 'PIKACHU',
        iconFindersSVG: 'EXAMPLE_ICON_FINDERS_SVG',
        defaultSVG: 'EXAMPLE_DEFAULT_SVG'
      };
    });

    it('maps name to name', () => {
      const mapped: Pokemon = pokemonAdapter.mapPokemon(unmapped);
      expect(mapped.name).toEqual(unmapped.name);
    });

    it('maps iconFindersSVG to roomIcon', () => {
      const mapped: Pokemon = pokemonAdapter.mapPokemon(unmapped);
      expect(mapped.roomIcon).toEqual(unmapped.iconFindersSVG);
    });

    it('maps defaultSVG to triviaAnswerIcon', () => {
      const mapped: Pokemon = pokemonAdapter.mapPokemon(unmapped);
      expect(mapped.triviaAnswerIcon).toEqual(unmapped.defaultSVG);
    });
  });
});
