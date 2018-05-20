import { NgModule } from '@angular/core';
import { SessionService } from './session.service';
import { SessionServiceConfig } from './session.service.config';

@NgModule({
  providers: [
    SessionService,
    {
      provide: SessionServiceConfig,
      useValue: { registerSessionEndpoint: '/session' }
    }
  ]
})
export class SessionModule { }
