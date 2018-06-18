import { PokemonStore } from './pokemon.store';
import { TestBed } from '@angular/core/testing';
import { Pokemon } from './pokemon.model';

describe('PokemonStore', () => {

  let pokemonStore: PokemonStore;
  let eevee: Pokemon;
  let pikachu: Pokemon;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ PokemonStore ]
    });

    pokemonStore = TestBed.get(PokemonStore);
    eevee = new Pokemon('Eevee', '', '');
    pikachu = new Pokemon('Pikachu', '', '');
  });

  describe('#deposit', () => {
    it('places pokemon in store for later retrieval', () => {
      pokemonStore.deposit(eevee);
      const retrievedEevee = pokemonStore.getByName(eevee.name);
      expect(retrievedEevee).toBe(eevee);
    });
  });

  describe('#depositList', () => {
    it('places a list of pokemon in the store for later retrieval', () => {
      pokemonStore.depositList([ eevee, pikachu ]);
      const retrievedEevee = pokemonStore.getByName(eevee.name);
      const retrievedPikachu = pokemonStore.getByName(pikachu.name);
      expect(retrievedEevee).toBe(eevee);
      expect(retrievedPikachu).toBe(pikachu);
    });
  });

});
