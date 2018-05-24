import { Injectable } from '@angular/core';
import { StompRService } from '@stomp/ng2-stompjs';
import { SessionConfig } from './session.config';

@Injectable()
export class SessionStomp {

  constructor(
    private stompService: StompRService,
    private config: SessionConfig
  ) { }

  initializeConnection(sessionId: string): void {
    this.stompService.config = { ...this.config.stomp, headers: { sessionId } };
    this.stompService.initAndConnect();
  }

}
