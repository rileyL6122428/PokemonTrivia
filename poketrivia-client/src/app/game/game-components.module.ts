import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { ReusableUIModule } from '../reusable-ui/reusable-ui.module';
import { GameNarratorModule } from '../game-narrator/game-narrator.module';

@NgModule({
  imports: [
    CommonModule,
    ReusableUIModule,
    GameNarratorModule
  ],
  declarations: [
    GameComponent
  ],
  exports: [
    GameComponent
  ]
})
export class GameComponentsModule { }
