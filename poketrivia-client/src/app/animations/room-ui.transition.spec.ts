import { TestBed, inject } from '@angular/core/testing';

import { RoomUITransition } from './room-ui.transition';

describe('RoomUITransition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomUITransition]
    });
  });

  it('should be created', inject([RoomUITransition], (transition: RoomUITransition) => {
    expect(transition).toBeTruthy();
  }));
});
