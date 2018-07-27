import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Room } from './room.model';
import { ActivatedRoute } from '@angular/router';
import { UICoordinates, RoomUITransition } from '../animations/room-ui.transition';

@Component({
  selector: 'pkt-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  room: Room;
  buttonCoords: UICoordinates;

  constructor(
    private roomService: RoomService,
    private uiTransition: RoomUITransition,
    private route: ActivatedRoute
  ) {
    console.log('hello world');
  }

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
