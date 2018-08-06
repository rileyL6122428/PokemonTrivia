import { NgModule } from '@angular/core';
import { RoomUITransition } from './room-ui.transition';
import { roomTransitionConfigToken, RoomTransitionConfig } from './room-transition.config';

export const roomTransitionConfig: RoomTransitionConfig = {
  frameSpeed: Math.floor(1000 / 60),
  matchmakingToRoom: {
    totalFrames: 80,
    targetTop: 5,
    targetLeft: 5
  }
};

@NgModule({
  providers: [
    RoomUITransition,
    {
      provide: roomTransitionConfigToken,
      useValue: roomTransitionConfig
    }
  ]
})
export class PokeTriviaAnimationsModule { }
