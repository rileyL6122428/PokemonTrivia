import { InjectionToken } from '@angular/core';

export interface MatchmakingConfig {
  errorMessageDurationMS: number;
}

export const matchmakingConfigToken = new InjectionToken<MatchmakingConfig>('machmakingConfig');
