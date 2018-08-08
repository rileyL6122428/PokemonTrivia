import { NgModule } from '@angular/core';
import { RoomButtonComponent } from './room-button/room-button.component';
import { HtmlInterpolationModule } from '../html-interpolation/html-interpolation.module';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ProfessorOakComponent } from './professor-oak/professor-oak.component';
import { SpeechBubbleComponent } from './speech-bubble/speech-bubble.component';
import { ScoreCardComponent } from './score-card/score-card.component';
import { ScoresComponent } from './scores/scores.component';
import { PointCounterComponent } from './point-counter/point-counter.component';

@NgModule({
  imports: [ HtmlInterpolationModule ],
  declarations: [
    RoomButtonComponent,
    LoadingIndicatorComponent,
    ErrorMessageComponent,
    ProfessorOakComponent,
    SpeechBubbleComponent,
    ScoreCardComponent,
    ScoresComponent,
    PointCounterComponent
  ],
  exports: [
    RoomButtonComponent,
    LoadingIndicatorComponent,
    ErrorMessageComponent,
    ProfessorOakComponent,
    SpeechBubbleComponent,
    ScoreCardComponent,
    ScoresComponent
  ]
})
export class ReusableUIModule { }
