import { Component, OnInit } from '@angular/core';
import { trigger, transition } from '@angular/animations';
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

  constructor(
    private roomService: RoomService,
    private uiTransition: RoomUITransition,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.room = this.roomService.get(this.roomName);
    this.uiTransition.moveRoomButtonToTopLeft();
  }

  private get roomName(): string {
    return this.route.snapshot.paramMap['params']['roomName'];
  }

  get buttonCoordinates(): object {
    return {
      top: `${this.uiTransition.selectedRoomButtonCoords.top}px`,
      left: `${this.uiTransition.selectedRoomButtonCoords.left}px`
    };
  }

}
