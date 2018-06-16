import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { SessionHttp } from './session.http';
import { SessionConfig } from './session.config';
import { HttpClientModule } from '@angular/common/http';

const config = {
  registerSessionEndpoint: '/REGISTER_SESSION_ENDPOINT'
};

describe('SessionHttp', () => {

  let sessionHttp: SessionHttp;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        SessionHttp,
        { provide: SessionConfig, useValue: config }
      ]
    });

    sessionHttp = TestBed.get(SessionHttp);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(sessionHttp).toBeTruthy();
  });

  describe('#registerSession', () => {
    it('makes a POST request to the configured endpoint', () => {
      sessionHttp.registerSession().subscribe();

      httpMock.expectOne({
        method: 'POST',
        url: config.registerSessionEndpoint
      });
    });

    it('returns an observable that emits the server response', () => {
      sessionHttp.registerSession()
        .subscribe((responseBody: any) => {
          expect(responseBody).toEqual({ 'EXAMPLE_PROPERTY': 'EXAMPLE_VALUE'});
        });

      httpMock.expectOne(config.registerSessionEndpoint)
        .flush({ 'EXAMPLE_PROPERTY': 'EXAMPLE_VALUE' });
    });
  });

  afterEach(() => httpMock.verify());
});
