import { NgModule } from '@angular/core';
import { AppLoadService } from './app-load.service';
import { AppLoadComponent } from './app-load.component';

@NgModule({
  declarations: [ AppLoadComponent ],
  exports: [ AppLoadComponent ],
  providers: [ AppLoadService ]
})
export class AppLoadModule { }
