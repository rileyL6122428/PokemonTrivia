import { InjectionToken } from '@angular/core';

export interface PokemonConfig {
  http: {
    GET_ALL: string
  };
}

export const PokemonConfigToken = new InjectionToken<PokemonConfig>('POKEMON_CONFIG');
