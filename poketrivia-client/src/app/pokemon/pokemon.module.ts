import { NgModule } from '@angular/core';
import { PokemonHttp } from './pokemon.http';

@NgModule({
  providers: [
    PokemonHttp
  ]
})
export class PokemonModule { }
