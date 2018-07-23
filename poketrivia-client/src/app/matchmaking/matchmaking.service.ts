import { Injectable } from '@angular/core';
import { Room } from '../room/room.model';
import { RoomService } from '../room/room.service';
import { Observable } from 'rxjs/Observable';
import { MatchmakingHttp } from './matchmaking.http';

@Injectable()
export class MatchmakingService {

  constructor(
    private roomService: RoomService,
    private http: MatchmakingHttp
  ) { }

  allRooms(): Array<Room> {
    return this.roomService.allRooms();
  }

  joinRoom(room: Room): Observable<boolean> {
    this.http.join(room);
    return null;
  }

  captureButtonCoordinates(roomButtonCoords: { top: number, left: number }): void {

  }

}
