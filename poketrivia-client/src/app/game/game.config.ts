import { InjectionToken } from '@angular/core';

export interface GameConfig {
  HTTP: {
    GET_GAME: (string) => string;
  };
}

export const gameConfigToken = new InjectionToken<GameConfig>('gameConfigToken');
