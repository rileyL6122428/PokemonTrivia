import { Injectable } from '@angular/core';

@Injectable()
export class RoomMatchmakingTransitionService {

  selectedRoomButtonCoords: RoomButtonCoordinates;

  constructor() {

  }

}

export interface RoomButtonCoordinates {
  top: number;
  left: number;
}
