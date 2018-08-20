import { TestBed, inject } from '@angular/core/testing';

import { RoomUITransition } from './room-ui.transition';
import { RoomTransitionConfig, roomTransitionConfigToken } from './room-transition.config';

const config: RoomTransitionConfig = {
  frameSpeed: 100,
  matchmakingToRoom: {
    totalFrames: 100,
    targetTop: 100,
    targetLeft: 100
  }
};

describe('RoomUITransition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoomUITransition,
        {
          provide: roomTransitionConfigToken,
          useValue: config
        }
      ]
    });
  });

  it('should be created', inject([RoomUITransition], (transition: RoomUITransition) => {
    expect(transition).toBeTruthy();
  }));
});
