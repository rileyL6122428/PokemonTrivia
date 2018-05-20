import { TestBed, inject } from '@angular/core/testing';

import { SessionStomp } from './session.stomp';
import { SessionConfig } from './session.config';
import { StompRService } from '@stomp/ng2-stompjs';

const config: SessionConfig =  {
  registerSessionEndpoint: '',
  stomp: {
    url: 'EXAMPLE_STOMP_URL',
    heartbeat_in: 1,
    heartbeat_out: 2,
    reconnect_delay: 3,
    debug: false
  }
};

describe('SessionStomp', () => {

  let sessionStomp: SessionStomp;
  let stompServiceMock: any;

  beforeEach(() => {
    stompServiceMock = jasmine.createSpyObj('stompService', ['initAndConnect']);

    TestBed.configureTestingModule({
      providers: [
        SessionStomp,
        { provide: StompRService, useValue: stompServiceMock },
        { provide: SessionConfig, useValue: config }
      ]
    });

    sessionStomp = TestBed.get(SessionStomp);
    stompServiceMock = TestBed.get(StompRService);
  });

  it('should be created', () => {
    expect(sessionStomp).toBeTruthy();
  });

  describe('#initializeConnection', () => {
    it('sets stompService\'s config property', () => {
      sessionStomp.initializeConnection('EXAMPLE_SESSION_ID');
      expect(stompServiceMock.config).toEqual({
        ...config.stomp, headers: { sessionId: 'EXAMPLE_SESSION_ID' }
      });
    });

    it('delegates setting up stomp connection to the stompService', () => {
      sessionStomp.initializeConnection('EXAMPLE_SESSION_ID');
      expect(stompServiceMock.initAndConnect).toHaveBeenCalled();
    });

    it('connects after setting config', () => {
      let configSnapshot = null;
      stompServiceMock.initAndConnect = () => {
        configSnapshot = stompServiceMock.config;
      };

      sessionStomp.initializeConnection('EXAMPLE_SESSION_ID');

      expect(configSnapshot).toEqual({
        ...config.stomp, headers: { sessionId: 'EXAMPLE_SESSION_ID' }
      });
    });
  });
});
