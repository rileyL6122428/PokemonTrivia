import { InjectionToken } from '@angular/core';

export interface MatchmakingConfig {
  errorMessageDurationMS: number;
  joinRoomPath: (roomName: string) => string;
}

export const matchmakingConfigToken = new InjectionToken<MatchmakingConfig>('machmakingConfig');
