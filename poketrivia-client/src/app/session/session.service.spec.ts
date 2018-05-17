import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { SessionService } from './session.service';
import { SessionServiceConfig } from './session.service.config';
import { HttpClientModule } from '@angular/common/http';
import { Session } from './session.model';

const config: SessionServiceConfig = {
  registerSessionEndpoint: '/REGISTER_SESSION_ENDPOINT'
};

describe('SessionService', () => {

  let sessionService: SessionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        SessionService,
        { provide: SessionServiceConfig, useValue: config }
      ]
    });

    sessionService = TestBed.get(SessionService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(sessionService).toBeTruthy();
  });

  describe('#registerSession', () => {
    it('makes a GET request to the configured endpoint', () => {
      sessionService.registerSession().subscribe();

      httpMock.expectOne({
        method: 'GET',
        url: config.registerSessionEndpoint
      });
    });

    it('returns observable passing the response body', () => {
      sessionService.registerSession()
        .subscribe((responseBody: any) => {
          expect(responseBody).toBe('EXAMPLE_RESPONSE_BODY');
        });

      httpMock.expectOne(config.registerSessionEndpoint)
        .flush({ body: 'EXAMPLE_RESPONSE_BODY' });
    });
  });

  afterEach(() => httpMock.verify());
});
