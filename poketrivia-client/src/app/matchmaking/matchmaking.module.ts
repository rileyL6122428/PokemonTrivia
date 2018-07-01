import { NgModule } from '@angular/core';
import { MatchmakingComponent } from './matchmaking.component';
import { MatchmakingService } from './matchmaking.service';

@NgModule({
  declarations: [ MatchmakingComponent ],
  exports: [ MatchmakingComponent ],
  providers: [ MatchmakingService ]
})
export class MatchmakingModule { }
