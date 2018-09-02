import { InjectionToken } from '@angular/core';

export interface GameConfig {
  HTTP: {
    GET_GAME: (roomName: string) => string;
    SUBMIT_ANSWER: (roomName: string) => string
  };
}

export const gameConfigToken = new InjectionToken<GameConfig>('gameConfigToken');
