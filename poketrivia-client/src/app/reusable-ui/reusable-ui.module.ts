import { NgModule } from '@angular/core';
import { RoomButtonComponent } from './room-button/room-button.component';
import { HtmlInterpolationModule } from '../html-interpolation/html-interpolation.module';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ProfessorOakComponent } from './professor-oak/professor-oak.component';
import { SpeechBubbleComponent } from './speech-bubble/speech-bubble.component';

@NgModule({
  imports: [ HtmlInterpolationModule ],
  declarations: [
    RoomButtonComponent,
    LoadingIndicatorComponent,
    ErrorMessageComponent,
    ProfessorOakComponent,
    SpeechBubbleComponent
  ],
  exports: [
    RoomButtonComponent,
    LoadingIndicatorComponent,
    ErrorMessageComponent,
    ProfessorOakComponent,
    SpeechBubbleComponent
  ]
})
export class ReusableUIModule { }
