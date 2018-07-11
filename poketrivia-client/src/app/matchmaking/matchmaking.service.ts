import { Injectable } from '@angular/core';
import { Room } from '../room/room.model';
import { RoomService } from '../room/room.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MatchmakingService {

  constructor(
    private roomService: RoomService
  ) { }

  allRooms(): Array<Room> {
    return this.roomService.allRooms();
  }

  joinRoom(room: Room): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

}
