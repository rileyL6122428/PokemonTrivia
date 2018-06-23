import { PokemonAdapter } from './pokemon.adapter';
import { TestBed } from '@angular/core/testing';
import { UnmappedPokemon } from './pokemon.http';
import { Pokemon } from './pokemon.model';

describe('PokemonAdapter', () => {
  let pokemonAdapter: PokemonAdapter;

  let unmappedPikachu: UnmappedPokemon;
  let unmappedEevee: UnmappedPokemon;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PokemonAdapter ]
    });

    pokemonAdapter = TestBed.get(PokemonAdapter);

    unmappedPikachu = {
      name: 'PIKACHU',
        iconFindersSVG: 'EXAMPLE_ICON_FINDERS_SVG',
          defaultSVG: 'EXAMPLE_DEFAULT_SVG'
    };

    unmappedEevee = {
      name: 'EEVEE',
      iconFindersSVG: 'EXAMPLE_ICON_FINDERS_SVG',
      defaultSVG: 'EXAMPLE_DEFAULT_SVG'
    };
  });

  describe('#mapPokemon', () => {
    it('maps name to name', () => {
      const mapped: Pokemon = pokemonAdapter.mapPokemon(unmappedPikachu);
      expect(mapped.name).toEqual(unmappedPikachu.name);
    });

    it('maps iconFindersSVG to roomIcon', () => {
      const mapped: Pokemon = pokemonAdapter.mapPokemon(unmappedPikachu);
      expect(mapped.roomIcon).toEqual(unmappedPikachu.iconFindersSVG);
    });

    it('maps defaultSVG to triviaAnswerIcon', () => {
      const mapped: Pokemon = pokemonAdapter.mapPokemon(unmappedPikachu);
      expect(mapped.triviaAnswerIcon).toEqual(unmappedPikachu.defaultSVG);
    });
  });

  describe('#mapPokemons', () => {
    let unmappedPokemons: Array<UnmappedPokemon>;
    let mappedPokemons: Array<Pokemon>;

    beforeEach(() => {
      unmappedPokemons = [ unmappedPikachu, unmappedEevee ];

      mappedPokemons = unmappedPokemons.map(unmapped => {
        return new Pokemon(unmapped.name, '', '');
      });

      spyOn(pokemonAdapter, 'mapPokemon').and.returnValues(...mappedPokemons);
    });

    it('delegates mapping to #mapPokemon', () => {
      pokemonAdapter.mapPokemons(unmappedPokemons);

      expect(pokemonAdapter.mapPokemon).toHaveBeenCalledTimes(unmappedPokemons.length);
      unmappedPokemons.forEach((unmapped) => {
        expect(pokemonAdapter.mapPokemon).toHaveBeenCalledWith(unmapped);
      });
    });

    it('returns list of pokemon returned from #mapPokemon', () => {
      const pokemons = pokemonAdapter.mapPokemons(unmappedPokemons);

      expect(pokemons.length).toEqual(unmappedPokemons.length);
      pokemons.forEach((pokemon: Pokemon, index: number) => {
        expect(pokemon.name).toEqual(unmappedPokemons[index].name);
      });
    });
  });
});
