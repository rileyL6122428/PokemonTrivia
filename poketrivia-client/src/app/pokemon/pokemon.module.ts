import { NgModule } from '@angular/core';
import { PokemonHttp } from './pokemon.http';
import { PokemonStore } from './pokemon.store';
import { PokemonService } from './pokemon.service';
import { PokemonAdapter } from './pokemon.adapter';
import { PokemonConfig, PokemonConfigToken } from './pokemon.config';

const config: PokemonConfig = {
  http: {
    GET_ALL: '/pokemon'
  }
};

@NgModule({
  providers: [
    PokemonHttp,
    PokemonAdapter,
    PokemonStore,
    PokemonService,
    { provide: PokemonConfigToken, useValue: config }
  ]
})
export class PokemonModule { }
