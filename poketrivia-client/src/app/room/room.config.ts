import { InjectionToken } from '@angular/core';

export interface RoomConfig {
  http: {
    GET_ALL: string;
  };
}

export const roomConfigToken = new InjectionToken<RoomConfig>('ROOM_CONFIG_TOKEN');
