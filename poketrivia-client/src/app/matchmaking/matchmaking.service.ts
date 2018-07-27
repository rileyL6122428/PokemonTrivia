import { Injectable } from '@angular/core';
import { Room } from '../room/room.model';
import { RoomService } from '../room/room.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { MatchmakingHttp, JoinRoomResponse } from './matchmaking.http';
import { map, tap, catchError } from 'rxjs/operators';
import { UnmappedRoom } from '../room/room.http';
import { RoomUITransition, UICoordinates } from '../animations/room-ui.transition';

@Injectable()
export class MatchmakingService {

  constructor(
    private roomService: RoomService,
    private http: MatchmakingHttp,
    private roomUITransition: RoomUITransition
  ) { }

  allRooms(): Array<Room> {
    return this.roomService.allRooms();
  }

  joinRoom(room: Room): Observable<boolean> {
    return this
      .http
      .join(room)
      .pipe(tap(
        (response: JoinRoomResponse) => this.depositRoom(response.room)
      ))
      .pipe(map(
        () => true
      ))
      .pipe(catchError(
        () => of(false)
      ));
  }

  private depositRoom(room: UnmappedRoom): void {
    this.roomService.deposit(room);
  }

  captureButtonCoordinates(roomButtonCoords: UICoordinates): void {
    this.roomUITransition.selectedRoomButtonCoords = roomButtonCoords;
  }

}
