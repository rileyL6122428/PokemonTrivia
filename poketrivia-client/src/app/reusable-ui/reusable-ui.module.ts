import { NgModule } from '@angular/core';
import { RoomButtonComponent } from './room-button/room-button.component';
import { HtmlInterpolationModule } from '../html-interpolation/html-interpolation.module';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

@NgModule({
  imports: [ HtmlInterpolationModule ],
  declarations: [ RoomButtonComponent, LoadingIndicatorComponent ],
  exports: [ RoomButtonComponent ]
})
export class ReusableUIModule { }
