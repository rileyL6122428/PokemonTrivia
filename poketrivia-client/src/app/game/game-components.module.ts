import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { ReusableUIModule } from '../reusable-ui/reusable-ui.module';

@NgModule({
  imports: [
    CommonModule,
    ReusableUIModule
  ],
  declarations: [
    GameComponent
  ],
  exports: [
    GameComponent
  ]
})
export class GameComponentsModule { }
