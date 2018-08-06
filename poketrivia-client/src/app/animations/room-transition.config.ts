import { InjectionToken } from '@angular/core';

export interface RoomTransitionConfig {
  frameSpeed: number;
  matchmakingToRoom: {
    totalFrames: number;
    targetTop: number;
    targetLeft: number;
  };
}

export const roomTransitionConfigToken = new InjectionToken<RoomTransitionConfig>(
  'RoomTransitionConfig'
);
