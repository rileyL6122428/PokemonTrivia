import { NgModule } from '@angular/core';
import { MatchmakingComponent } from './matchmaking.component';
import { MatchmakingService } from './matchmaking.service';
import { CommonModule } from '@angular/common';
import { HtmlInterpolationModule } from '../html-interpolation/html-interpolation.module';

@NgModule({
  imports: [
    CommonModule,
    HtmlInterpolationModule
  ],
  declarations: [ MatchmakingComponent ],
  exports: [ MatchmakingComponent ],
  providers: [ MatchmakingService ]
})
export class MatchmakingModule { }
