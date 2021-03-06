import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { MatchmakingComponent } from './matchmaking/matchmaking.component';
import { AppLoadComponent } from './app-load/app-load.component';
import { NgModule } from '@angular/core';
import { RoomComponent } from './room/room.component';


const routes: Routes = [
  { path: '', component: AppLoadComponent },
  { path: 'rooms', component: MatchmakingComponent },
  { path: 'room/:roomName', component: RoomComponent },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
