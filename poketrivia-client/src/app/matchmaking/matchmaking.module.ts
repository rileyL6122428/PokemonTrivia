import { NgModule } from '@angular/core';
import { MatchmakingComponent } from './matchmaking.component';
import { MatchmakingService } from './matchmaking.service';
import { CommonModule } from '@angular/common';
import { HtmlInterpolationModule } from '../html-interpolation/html-interpolation.module';
import { ReusableUIModule } from '../reusable-ui/reusable-ui.module';

@NgModule({
  imports: [
    CommonModule,
    HtmlInterpolationModule,
    ReusableUIModule
  ],
  declarations: [ MatchmakingComponent ],
  exports: [ MatchmakingComponent ],
  providers: [ MatchmakingService ]
})
export class MatchmakingModule { }
