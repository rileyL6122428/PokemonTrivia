import { Injectable } from '@angular/core';
import { Room } from '../room/room.model';
import { RoomService } from '../room/room.service';

@Injectable()
export class MatchmakingService {

  constructor(
    private roomService: RoomService
  ) { }

  allRooms(): Array<Room> {
    return this.roomService.allRooms();
  }

  joinRoom(room: Room): any {
    throw new Error('Method not implemented.');
  }

}
