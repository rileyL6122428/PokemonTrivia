import { TestBed, inject } from '@angular/core/testing';

import { SessionStompService } from './session-stomp.service';

describe('SessionStompService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStompService]
    });
  });

  it('should be created', inject([SessionStompService], (service: SessionStompService) => {
    expect(service).toBeTruthy();
  }));
});
