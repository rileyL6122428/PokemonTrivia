import { PokemonHttp } from './pokemon.http';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonConfigToken, PokemonConfig } from './pokemon.config';

const pokemonTestConfig: PokemonConfig = {
  http: { GET_ALL: '/pokemon' }
};

describe('PokemonHttp', () => {

  let pokemonHttp: PokemonHttp;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        PokemonHttp,
        { provide: PokemonConfigToken, useValue: pokemonTestConfig }
      ]
    });

    pokemonHttp = TestBed.get(PokemonHttp);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('#fetchAll', () => {
    it('makes a GET request to the provided endpoint', () => {
      pokemonHttp.fetchAll().subscribe();

      httpMock.expectOne({
        method: 'GET',
        url: pokemonTestConfig.http.GET_ALL
      });
    });

    it('returns an observable passing the server response', () => {
      pokemonHttp
        .fetchAll()
        .subscribe((response) => {
          expect(response).toEqual([{ name: 'PIKACHU' }, { name: 'EEVEE' }]);
        });

      httpMock
        .expectOne(pokemonTestConfig.http.GET_ALL)
        .flush([{ name: 'PIKACHU' }, { name: 'EEVEE' }]);
    });
  });

  afterEach(() => httpMock.verify());
});
