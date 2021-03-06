import { TestBed, async } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { PokemonHttp, UnmappedPokemon } from './pokemon.http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { PokemonAdapter } from './pokemon.adapter';
import { Pokemon } from './pokemon.model';
import { PokemonStore } from './pokemon.store';

describe('PokemonService', () => {

  let pokemonService: PokemonService;
  let pokemonHttpMock: any;
  let pokemonAdapterMock: any;
  let pokemonStoreMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        {
          provide: PokemonHttp,
          useValue: jasmine.createSpyObj('pokemonHttp', ['fetchAll'])
        },
        {
          provide: PokemonAdapter,
          useValue: jasmine.createSpyObj('pokemonAdapter', ['mapPokemons'])
        },
        {
          provide: PokemonStore,
          useValue: jasmine.createSpyObj('pokemonStore', ['depositList', 'getByName'])
        }
      ]
    });

    pokemonService = TestBed.get(PokemonService);
    pokemonHttpMock = TestBed.get(PokemonHttp);
    pokemonAdapterMock = TestBed.get(PokemonAdapter);
    pokemonStoreMock = TestBed.get(PokemonStore);
  });


  describe('#fetchPokemon', () => {

    let fetchPokemonObserver: Observer<Array<UnmappedPokemon>>;
    let fetchedPokemon: Array<UnmappedPokemon>;
    let mappedPokemon: Array<Pokemon>;

    beforeEach(() => {
      _stubFetchAllPokemon();
      _stubMapPokemons();
    });

    it('delegates pokemon retrieval to pokemonHttp', async(() => {
      pokemonService.fetchPokemon().subscribe();
      expect(pokemonHttpMock.fetchAll).toHaveBeenCalled();
    }));

    it('passes retrieved payload to pokemonAdapter', async(() => {
      pokemonService.fetchPokemon().subscribe();
      fetchPokemonObserver.next(fetchedPokemon);
      expect(pokemonAdapterMock.mapPokemons).toHaveBeenCalledWith(fetchedPokemon);
    }));

    it('deposits mapped pokemon into pokemonStore', async(() => {
      pokemonService.fetchPokemon().subscribe();
      fetchPokemonObserver.next(fetchedPokemon);
      expect(pokemonStoreMock.depositList).toHaveBeenCalledWith(mappedPokemon);
    }));

    it('emits true when process completes without errors', async(() => {
      pokemonService
        .fetchPokemon()
        .subscribe(successful => expect(successful).toBe(true));
      fetchPokemonObserver.next(fetchedPokemon);
    }));

    it('emits false when processes throw errors', async(() => {
      pokemonService
        .fetchPokemon()
        .subscribe(successful => expect(successful).toBe(false));
      fetchPokemonObserver.error('EXAMPLE ERROR MESSAGE');
    }));

    function _stubFetchAllPokemon() {
      pokemonHttpMock.fetchAll.and.returnValue(
        new Observable<any>(observer => fetchPokemonObserver = observer)
      );

      fetchedPokemon = [
        { name: 'Eevee', iconFindersSVG: '', defaultSVG: '' },
        { name: 'Pikachu', iconFindersSVG: '', defaultSVG: '' }
      ] as Array<UnmappedPokemon>;
    }

    function _stubMapPokemons() {
      mappedPokemon = [
        new Pokemon('Eevee', '', ''),
        new Pokemon('Pikachu', '', '')
      ];

      pokemonAdapterMock.mapPokemons.and.returnValue(mappedPokemon);
    }
  });

  describe('#getByName', () => {
    it('delegates to PokemonStore', () => {
      const eevee: Pokemon = new Pokemon('Eevee', '', '');
      pokemonStoreMock.getByName.and.returnValue(eevee);

      const retrievedEevee = pokemonService.getByName(eevee.name);

      expect(pokemonStoreMock.getByName).toHaveBeenCalledWith(eevee.name);
      expect(retrievedEevee).toBe(eevee);
    });
  });

});
