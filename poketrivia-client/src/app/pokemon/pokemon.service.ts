import { Injectable } from '@angular/core';
import { PokemonHttp, UnmappedPokemon } from './pokemon.http';
import { PokemonAdapter } from './pokemon.adapter';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/Observable/of';
import { Pokemon } from './pokemon.model';
import { PokemonStore } from './pokemon.store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PokemonService {

  constructor(
    private httpUtil: PokemonHttp,
    private adapter: PokemonAdapter,
    private store: PokemonStore
  ) { }

  fetchPokemon(): Observable<boolean> {
    return this.httpUtil
      .fetchAll()
      .pipe(map(
        (unmapped: Array<UnmappedPokemon>) => this.adapter.mapPokemons(unmapped)
      ))
      .pipe(tap((pokemon: Array<Pokemon>) => {
        this.store.depositList(pokemon);
      }))
      .pipe(map(() => true))
      .pipe(catchError((() => of(false))));
  }

  getByName(name: string): Pokemon {
    return this.store.getByName(name);
  }

}
