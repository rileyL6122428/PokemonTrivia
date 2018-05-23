import { TestBed, inject, async } from '@angular/core/testing';
import { SessionService } from './session.service';
import { SessionHttp } from './session.http';
import { SessionServiceAdapter } from './session.adapter';
import { SessionStomp } from './session.stomp';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

describe('SessionService', () => {

  let sessionService: SessionService;
  let sessionHttpMock;
  let sessionAdapterMock;
  let sessionStompMock;

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
    // debugger
    sessionService = TestBed.get(SessionService),
    sessionHttpMock = TestBed.get(SessionHttp),
    sessionAdapterMock = TestBed.get(SessionServiceAdapter),
    sessionStompMock = TestBed.get(SessionStomp);
  });

  it('should be created', () => expect(sessionService).toBeTruthy());

  fdescribe('#openConnections', () => {

    let registerSessionObserver: Observer<any>;
    let unmappedSession: any;
    let mappedSession: any;

    beforeEach(() => {
      _stubRegisterSession();
      _stubMapPOJO();
    });

    it('calls SessionHttp#registerSession', async(() => {
      sessionService.openConnections()
        .subscribe((successful) => {
          expect(sessionHttpMock.registerSession).toHaveBeenCalled();
        });

      registerSessionObserver.next(unmappedSession);
    }));

    function _stubRegisterSession() {
      sessionHttpMock.registerSession.and.returnValue(
        new Observable<any>((observer) => registerSessionObserver = observer)
      );
      unmappedSession = { id: 'EXAMPLE_ID_FOR_UNMAPPED_SESSION' };
    }

    function _stubMapPOJO() {
      mappedSession = { id: 'EXAMPLE_ID_FOR_MAPPED_SESSION' };
      sessionAdapterMock.mapFromPOJO.and.returnValue(mappedSession);
    }
  });
});
