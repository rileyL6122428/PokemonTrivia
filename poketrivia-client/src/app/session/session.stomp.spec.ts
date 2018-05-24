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
  let stompService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionStomp,
        { provide: SessionConfig, useValue: config },
        {
          provide: StompRService,
          useValue: jasmine.createSpyObj('stompService', ['initAndConnect'])
        },
      ]
    });

    sessionStomp = TestBed.get(SessionStomp);
    stompService = TestBed.get(StompRService);
  });

  it('should be created', () => {
    expect(sessionStomp).toBeTruthy();
  });

  describe('#initializeConnection', () => {
    it('sets stompService\'s config property', () => {
      sessionStomp.initializeConnection('EXAMPLE_SESSION_ID');
      expect(stompService.config).toEqual({
        ...config.stomp, headers: { sessionId: 'EXAMPLE_SESSION_ID' }
      });
    });

    it('delegates setting up a web sockets connection to the stompService', () => {
      sessionStomp.initializeConnection('EXAMPLE_SESSION_ID');
      expect(stompService.initAndConnect).toHaveBeenCalled();
    });

    it('connects after setting config on the stompService', () => {
      let configSnapshot = null;
      stompService.initAndConnect = () => {
        configSnapshot = stompService.config;
      };

      sessionStomp.initializeConnection('EXAMPLE_SESSION_ID');

      expect(configSnapshot).toEqual({
        ...config.stomp, headers: { sessionId: 'EXAMPLE_SESSION_ID' }
      });
    });
  });
});
