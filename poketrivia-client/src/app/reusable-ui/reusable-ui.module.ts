import { NgModule } from '@angular/core';
import { RoomButtonComponent } from './room-button/room-button.component';
import { HtmlInterpolationModule } from '../html-interpolation/html-interpolation.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ HtmlInterpolationModule, CommonModule ],
  declarations: [ RoomButtonComponent ],
  exports: [ RoomButtonComponent ]
})
export class ReusableUIModule { }
