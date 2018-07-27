import { Injectable } from '@angular/core';

@Injectable()
export class RoomUITransition {

  selectedRoomButtonCoords: UICoordinates;

}

export interface UICoordinates {
  top: number;
  left: number;
}
