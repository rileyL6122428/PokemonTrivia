import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PokemonConfig, PokemonConfigToken } from './pokemon.config';
import { map } from 'rxjs/operators/map';

@Injectable()
export class PokemonHttp {

  constructor(
    private http: HttpClient,
    @Inject(PokemonConfigToken) private config: PokemonConfig
  ) { }

  fetchAll(): Observable<Array<UnmappedPokemon>> {
    return this.http
      .get(this.config.http.GET_ALL)
      .pipe(
        map((pokemon) => pokemon as Array<UnmappedPokemon>)
      );
  }

}

export interface UnmappedPokemon {
  name: string;
  iconFindersSVG: string;
  defaultSVG: string;
}
