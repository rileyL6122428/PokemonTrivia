import { Frame } from './frame.model';

export class Animation {

  private frames: Array<Frame>;

  constructor(frames: Array<Frame>) {
    this.frames = frames.reverse();
  }

  get finished(): boolean {
    return this.frames.length <= 0;
  }

  nextFrame(): { top: number, left: number } {
    return this.frames.pop();
  }

}
