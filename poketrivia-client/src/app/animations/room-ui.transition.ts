import { Injectable, Inject } from '@angular/core';
import { roomTransitionConfigToken, RoomTransitionConfig } from './room-transition.config';
import { PositionAnimationBase } from './position-animation.base';

@Injectable()
export class RoomUITransition extends PositionAnimationBase {

  constructor(
    @Inject(roomTransitionConfigToken) private config: RoomTransitionConfig
  ) {
    super();
   }

  moveRoomButtonToTopLeft(): void {
    this.animate({
      frameSpeed: this.frameSpeed,
      frameTotal: this.totalFrames,
      initialTop: this.position.top,
      initialLeft: this.position.left,
      targetTop: this.targetTop,
      targetLeft: this.targetLeft,
      topFrameSplitter: frameDecimal => (-1.222222) * frameDecimal + (2.222222) * (frameDecimal ** 2),
      leftFrameSplitter: frameDecimal => (-1.222222) * frameDecimal + (2.222222) * (frameDecimal ** 2),
    });
  }

  get frameSpeed(): number {
    return this.config.frameSpeed;
  }

  get selectedRoomButtonCoords(): UICoordinates {
    return this.position;
  }

  set selectedRoomButtonCoords(coords: UICoordinates) {
    this.position = coords;
  }

  private get targetTop(): number {
    return this.config.matchmakingToRoom.targetTop;
  }

  private get targetLeft(): number {
    return this.config.matchmakingToRoom.targetLeft;
  }

  private get totalFrames(): number {
    return this.config.matchmakingToRoom.totalFrames;
  }

}

export interface UICoordinates {
  top: number;
  left: number;
}
