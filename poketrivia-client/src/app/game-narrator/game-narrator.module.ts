import { NgModule } from '@angular/core';
import { GameNarratorComponent } from './game-narrator.component';
import { ReusableUIModule } from '../reusable-ui/reusable-ui.module';

@NgModule({
  imports: [
    ReusableUIModule
  ],

  declarations: [
    GameNarratorComponent
  ],

  exports: [
    GameNarratorComponent
  ]
})
export class GameNarratorModule { }
