import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../../room/room.model';

@Component({
  selector: 'pkt-room-button',
  templateUrl: './room-button.component.html',
  styleUrls: ['./room-button.component.scss']
})
export class RoomButtonComponent {

  @Input() room: Room;
  @Output('roomButtonClick') click: EventEmitter<Room>;

  constructor() {
    this.click = new EventEmitter<Room>();
  }

}
