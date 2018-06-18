import { Injectable } from '@angular/core';
import { PokemonHttp, UnmappedPokemon } from './pokemon.http';
import { PokemonAdapter } from './pokemon.adapter';
import { map } from 'rxjs/operators/map';
import { Pokemon } from './pokemon.model';
import { PokemonStore } from './pokemon.store';

@Injectable()
export class PokemonService {

  constructor(
    private httpUtil: PokemonHttp,
    private adapter: PokemonAdapter,
    private store: PokemonStore
  ) { }

  fetchPokemon(): void {
    this.httpUtil
      .fetchAll()
      .pipe(map(
        (unmapped: Array<UnmappedPokemon>) => this.adapter.mapPokemons(unmapped)
      ))
      .subscribe((pokemon: Array<Pokemon>) => {
        this.store.depositList(pokemon);
      });
  }

}
