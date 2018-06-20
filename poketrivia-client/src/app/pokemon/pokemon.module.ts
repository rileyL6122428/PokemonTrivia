import { NgModule } from '@angular/core';
import { PokemonHttp } from './pokemon.http';
import { PokemonStore } from './pokemon.store';
import { PokemonService } from './pokemon.service';
import { PokemonAdapter } from './pokemon.adapter';

@NgModule({
  providers: [
    PokemonHttp,
    PokemonAdapter,
    PokemonStore,
    PokemonService
  ]
})
export class PokemonModule { }
