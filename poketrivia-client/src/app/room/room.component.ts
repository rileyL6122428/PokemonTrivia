import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Room } from './room.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomButtonCoordinates, RoomMatchmakingTransitionService } from '../animations/room-matchmaking-transition.service';

@Component({
  selector: 'pkt-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  room: Room;
  buttonCoords: RoomButtonCoordinates;

  constructor(
    private roomService: RoomService,
    private uiTransition: RoomMatchmakingTransitionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.room = this.roomService.get(this.roomName);
    this.buttonCoords = this.uiTransition.selectedRoomButtonCoords;
  }

  private get roomName(): string {
    return this.route.snapshot.paramMap['params']['roomName'];
  }

  get buttonCoordinates(): object {
    return {
      top: `${this.buttonCoords.top}px`,
      left: `${this.buttonCoords.left}px`
    };
  }

}
