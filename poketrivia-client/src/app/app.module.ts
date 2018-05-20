import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SessionModule } from './session/session.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    SessionModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule { }
