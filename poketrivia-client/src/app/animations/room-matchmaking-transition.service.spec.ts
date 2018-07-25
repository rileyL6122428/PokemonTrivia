import { TestBed, inject } from '@angular/core/testing';

import { RoomMatchmakingTransitionService } from './room-matchmaking-transition.service';

describe('RoomMatchmakingTransitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomMatchmakingTransitionService]
    });
  });

  it('should be created', inject([RoomMatchmakingTransitionService], (service: RoomMatchmakingTransitionService) => {
    expect(service).toBeTruthy();
  }));
});
