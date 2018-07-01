import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './safe.pipe';

@NgModule({
  declarations: [ SafeHtmlPipe ],
  exports: [ SafeHtmlPipe ]
})
export class HtmlInterpolationModule { }
