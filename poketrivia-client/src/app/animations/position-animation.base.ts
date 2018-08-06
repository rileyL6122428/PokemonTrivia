import { Animation } from './animation.model';
import { Frame } from './frame.model';

export class PositionAnimationBase {

  protected position: { top: number, left: number };

  protected animate(params: PositionAnimationParameters): void {
    const animation = this.splitFrames(params);
    this.runAnimation(animation, params);
  }

  private splitFrames(params: PositionAnimationParameters): Animation {
    const frames: Array<Frame> = [];
    for (let increment = 0; increment <= 1; increment += 1 / params.frameTotal) {
      const nextTop =
        params.topFrameSplitter(increment) * (params.targetTop - params.initialTop) + params.initialTop;
      const nextLeft =
        params.leftFrameSplitter(increment) * (params.targetLeft - params.initialLeft) + params.initialLeft;
      frames.push(new Frame(nextTop, nextLeft));
    }
    return new Animation(frames);
  }

  private runAnimation(animation: Animation, params: PositionAnimationParameters): void {
    const interval = setInterval(() => {
      this.position = animation.nextFrame();
      if (animation.finished) {
        this.position = { top: params.targetTop, left: params.targetLeft };
        clearInterval(interval);
      }
    }, params.frameSpeed);
  }

}

export interface PositionAnimationParameters {
  topFrameSplitter: FrameSplitter; // should be func with init value 0 and final val 1 on x from 0 to 1
  leftFrameSplitter: FrameSplitter;
  frameSpeed: number;
  frameTotal: number;
  initialTop: number;
  initialLeft: number;
  targetTop: number;
  targetLeft: number;
}

type FrameSplitter = (frameDecimal: number) => number;
