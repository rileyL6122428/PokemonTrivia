import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PokemonConfig, PokemonConfigToken } from './pokemon.config';

@Injectable()
export class PokemonHttp {

  constructor(
    private http: HttpClient,
    @Inject(PokemonConfigToken) private config: PokemonConfig
  ) { }

  fetchAll(): Observable<any> {
    return this.http.get(this.config.http.GET_ALL);
  }

}
