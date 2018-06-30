import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SessionModule } from './session/session.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StompRService } from '@stomp/ng2-stompjs';
import { PokemonModule } from './pokemon/pokemon.module';
import { RoomModule } from './room/room.module';
import { SafeHtmlPipe } from './html-interpolation/safe.pipe';
import { AppLoadComponent } from './app-load/app-load.component';
import { MatchmakingComponent } from './matchmaking/matchmaking.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLoadModule } from './app-load/app-load.module';

@NgModule({
  imports: [
    BrowserModule,
    SessionModule,
    PokemonModule,
    RoomModule,
    HttpClientModule,
    AppRoutingModule,
    AppLoadModule
  ],
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    MatchmakingComponent,
    ErrorComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ StompRService ],
})
export class AppModule { }
