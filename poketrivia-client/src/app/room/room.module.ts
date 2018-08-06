import { NgModule } from '@angular/core';
import { RoomHttp } from './room.http';
import { RoomAdapter } from './room.adapter';
import { RoomStore } from './room.store';
import { RoomService } from './room.service';
import { roomConfigToken } from './room.config';
import { RoomComponent } from './room.component';
import { ReusableUIModule } from '../reusable-ui/reusable-ui.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ReusableUIModule,
    CommonModule
  ],
  providers: [
    RoomHttp,
    RoomAdapter,
    RoomStore,
    RoomService,
    {
      provide: roomConfigToken,
      useValue: {
        http: { GET_ALL: '/rooms' }
      }
    }
  ],
  declarations: [ RoomComponent ]
})
export class RoomModule { }
