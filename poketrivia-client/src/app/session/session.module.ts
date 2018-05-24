import { NgModule } from '@angular/core';
import { SessionHttp } from './session.http';
import { SessionConfig } from './session.config';
import { SessionService } from './session.service';
import { SessionServiceAdapter } from './session.adapter';
import { SessionStomp } from './session.stomp';

@NgModule({
  providers: [
    SessionHttp,
    SessionService,
    SessionServiceAdapter,
    SessionStomp,
    {
      provide: SessionConfig,
      useValue: {
        registerSessionEndpoint: '/session',
        stomp: {
          url: 'ws://localhost:8080/poke-trivia/websocket',
          heartbeat_in: 0,
          heartbeat_out: 20000,
          reconnect_delay: 5000,
          debug: true
        }
      }
    },
  ]
})
export class SessionModule { }
