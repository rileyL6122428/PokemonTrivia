import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../../room/room.model';

@Component({
  selector: 'pkt-room-button',
  templateUrl: './room-button.component.html',
  styleUrls: ['./room-button.component.scss']
})
export class RoomButtonComponent {

  @Input() room: Room;
  @Input('invertColors') manuallyInvertColors: boolean;
  @Output('roomButtonClick') click: EventEmitter<Room>;

  isHovered: boolean;

  constructor() {
    this.click = new EventEmitter<Room>();
  }

  get colorsInverted(): boolean {
    return this.isHovered || this.manuallyInvertColors;
  }

  registerHover(): void {
    console.log('hovering');
    this.isHovered = true;
  }

  registerMouseLeave(): void {
    console.log('leaving');
    this.isHovered = false;
  }

}
