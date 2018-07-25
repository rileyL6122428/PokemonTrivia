import { NgModule } from '@angular/core';
import { MatchmakingComponent } from './matchmaking.component';
import { MatchmakingService } from './matchmaking.service';
import { CommonModule } from '@angular/common';
import { ReusableUIModule } from '../reusable-ui/reusable-ui.module';
import { MatchmakingHttp } from './matchmaking.http';
import { matchmakingConfigToken, MatchmakingConfig } from './matchmaking.config';

export const matchmakingConfig: MatchmakingConfig = {
  errorMessageDurationMS: 5000,
  joinRoomPath: (roomName: string) => `/join-room/${roomName}`
};

@NgModule({
  imports: [
    CommonModule,
    ReusableUIModule
  ],
  declarations: [ MatchmakingComponent ],
  exports: [ MatchmakingComponent ],
  providers: [
    MatchmakingService,
    MatchmakingHttp,
    { provide: matchmakingConfigToken, useValue: matchmakingConfig }
  ]
})
export class MatchmakingModule { }
