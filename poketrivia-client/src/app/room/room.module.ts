import { NgModule } from '@angular/core';
import { RoomHttp } from './room.http';
import { RoomAdapter } from './room.adapter';
import { RoomStore } from './room.store';
import { RoomService } from './room.service';
import { roomConfigToken } from './room.config';

@NgModule({
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
  ]
})
export class RoomModule { }
