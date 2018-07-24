import { NgModule } from '@angular/core';
import { RoomButtonComponent } from './room-button/room-button.component';
import { HtmlInterpolationModule } from '../html-interpolation/html-interpolation.module';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  imports: [ HtmlInterpolationModule ],
  declarations: [
    RoomButtonComponent,
    LoadingIndicatorComponent,
    ErrorMessageComponent
  ],
  exports: [
    RoomButtonComponent,
    LoadingIndicatorComponent,
    ErrorMessageComponent
  ]
})
export class ReusableUIModule { }
