import { TestBed, inject, async } from '@angular/core/testing';
import { SessionService } from './session.service';
import { SessionHttp } from './session.http';
import { SessionServiceAdapter } from './session.adapter';
import { SessionStomp } from './session.stomp';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

describe('SessionService', () => {

  let sessionService: SessionService;
  let sessionHttp: any;
  let sessionAdapter: any;
  let sessionStomp: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionService,
        {
          provide: SessionHttp,
          useValue: jasmine.createSpyObj('sessionHttp', ['registerSession'])
        },
        {
          provide: SessionServiceAdapter,
          useValue: jasmine.createSpyObj('sessionAdapter', ['mapFromPOJO'])
        },
        {
          provide: SessionStomp,
          useValue: jasmine.createSpyObj('sessionStomp', ['initializeConnection'])
        }
      ]
    });

    sessionService = TestBed.get(SessionService),
    sessionHttp = TestBed.get(SessionHttp),
    sessionAdapter = TestBed.get(SessionServiceAdapter),
    sessionStomp = TestBed.get(SessionStomp);
  });

  it('creates', () => expect(sessionService).toBeTruthy());

  describe('#openConnections', () => {

    let registerSessionObserver: Observer<any>;
    let unmappedSession: any;
    let mappedSession: any;

    beforeEach(() => {
      _stubRegisterSession();
      _stubMapPOJO();
    });

    it('registers the session', async(() => {
      sessionService.openConnections()
        .subscribe(() => {
          expect(sessionHttp.registerSession).toHaveBeenCalled();
        });

      registerSessionObserver.next(unmappedSession);
    }));

    it('maps registerSession payload', async(() => {
      sessionService.openConnections()
        .subscribe(() => {
          expect(sessionAdapter.mapFromPOJO).toHaveBeenCalledWith(unmappedSession);
        });

      registerSessionObserver.next(unmappedSession);
    }));

    it('initializes stomp connection with mapped session id', async(() => {
      sessionService.openConnections()
        .subscribe(() => {
          expect(sessionStomp.initializeConnection).toHaveBeenCalledWith(mappedSession.id);
        });

      registerSessionObserver.next(unmappedSession);
    }));

    it('emits \'true\' when observable pipe line is successful', async(() => {
      sessionService.openConnections()
        .subscribe((successful) => {
          expect(successful).toBe(true);
        });

      registerSessionObserver.next(unmappedSession);
    }));

    it('emits \'false\' when observable pipe line throws an error', async(() => {
      sessionService.openConnections()
        .subscribe((successful) => {
          expect(successful).toBe(false);
        });

      registerSessionObserver.error('ERROR OCCURRED');
    }));

    function _stubRegisterSession() {
      sessionHttp.registerSession.and.returnValue(
        new Observable<any>((observer) => registerSessionObserver = observer)
      );
      unmappedSession = { id: 'EXAMPLE_ID_FOR_UNMAPPED_SESSION' };
    }

    function _stubMapPOJO() {
      mappedSession = { id: 'EXAMPLE_ID_FOR_MAPPED_SESSION' };
      sessionAdapter.mapFromPOJO.and.returnValue(mappedSession);
    }
  });
});
