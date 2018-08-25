export class OpenablePokeball {

  private _topOpeningHeight: number;
  private _bottomOpeningHeight: number;
  private _buttonHeight: number;
  private _buttonRadiusY: number;
  private animatingOpenOrClose: boolean;

  constructor() {
    this._topOpeningHeight = this.circleBaselineOpeningHeight;
    this._bottomOpeningHeight = this.circleBaselineOpeningHeight;
    this._buttonHeight = this.circleBaselineOpeningHeight;
    this._buttonRadiusY = this.buttonBaselineRadiusY;
  }

  get topOpeningHeight(): number {
    return this._topOpeningHeight;
  }

  get bottomOpeningHeight(): number {
    return this._bottomOpeningHeight;
  }

  get buttonHeight(): number {
    return this._buttonHeight;
  }

  get buttonRadiusY(): number {
    return this._buttonRadiusY;
  }

  toggleOpenClose(): void {
    if (!this.animatingOpenOrClose && this.isOpen) {
      this.animateClose();
    } else if (!this.animatingOpenOrClose && !this.isOpen) {
      this.animateOpen();
    }
  }

  close(): void {
    if (!this.animatingOpenOrClose) {
      this.animateClose();
    }
  }

  animateOpen(): void {
    this.animateChangeInOpeningHeight({
      topHeightIncrement: -this.topCircleAnimationIncrement,
      finalTopHeight: this.topCircleMaxOpeningHeight,
      bottomHeightIncrement: this.bottomCircleAnimationIncrement,
      finalBottomHeight: this.bottomCircleMaxOpeningHeight,
      buttonRadiusYIncrement: -this.buttonRadiusYIncrement,
      finalButtonRadius: this.buttonMinRadiusY,
      buttonHeightIncrement: -this.buttonHeightIncrement,
      finalButtonHeight: this.buttonMaxOpeningHeight,
      clearAnimationCondition: () => this._topOpeningHeight <= this.topCircleMaxOpeningHeight
    });
  }

  animateClose(): void {
    this.animateChangeInOpeningHeight({
      topHeightIncrement: this.topCircleAnimationIncrement,
      finalTopHeight: this.circleBaselineOpeningHeight,
      bottomHeightIncrement: -this.bottomCircleAnimationIncrement,
      finalBottomHeight: this.circleBaselineOpeningHeight,
      buttonRadiusYIncrement: this.buttonRadiusYIncrement,
      finalButtonRadius: this.buttonBaselineRadiusY,
      buttonHeightIncrement: this.buttonHeightIncrement,
      finalButtonHeight: this.circleBaselineOpeningHeight,
      clearAnimationCondition: () => this._topOpeningHeight >= this.circleBaselineOpeningHeight
    });
  }

  animateChangeInOpeningHeight(params: {
    topHeightIncrement: number,
    finalTopHeight: number
    bottomHeightIncrement: number,
    finalBottomHeight: number,
    buttonRadiusYIncrement: number,
    finalButtonRadius: number,
    buttonHeightIncrement: number,
    finalButtonHeight: number,
    clearAnimationCondition: () => boolean
  }): void {
    this.animatingOpenOrClose = true;
    const openPokeballInterval = setInterval(() => {
      if (params.clearAnimationCondition()) {
        clearInterval(openPokeballInterval);
        this._topOpeningHeight = params.finalTopHeight;
        this._bottomOpeningHeight = params.finalBottomHeight;
        this._buttonRadiusY = params.finalButtonRadius;
        this._buttonHeight = params.finalButtonHeight;
        this.animatingOpenOrClose = false;
      } else {
        this._topOpeningHeight += params.topHeightIncrement;
        this._bottomOpeningHeight += params.bottomHeightIncrement;
        this._buttonRadiusY += params.buttonRadiusYIncrement;
        this._buttonHeight += params.buttonHeightIncrement;
      }
    }, this.animationFrameRate);
  }

  get isOpen(): boolean {
    return this._topOpeningHeight === this.topCircleMaxOpeningHeight;
  }

  private get circleBaselineOpeningHeight(): number {
    return 60;
  }

  private get buttonBaselineRadiusY(): number {
    return 12.5;
  }

  private get topCircleMaxOpeningHeight(): number {
    return 9.975;
  }

  private get bottomCircleMaxOpeningHeight(): number {
    return 94.8;
  }

  private get buttonMaxOpeningHeight(): number {
    return 24.33;
  }

  private get buttonMinRadiusY(): number {
    return 8.585;
  }

  private get animationFrameRate(): number {
    return 1000 / 60;
  }

  private get topCircleAnimationIncrement(): number {
    return (this.circleBaselineOpeningHeight - this.topCircleMaxOpeningHeight) / 30;
  }

  private get bottomCircleAnimationIncrement(): number {
    return (this.bottomCircleMaxOpeningHeight - this.circleBaselineOpeningHeight) / 30;
  }

  private get buttonRadiusYIncrement(): number {
    return (this.buttonBaselineRadiusY - this.buttonMinRadiusY) / 30;
  }

  private get buttonHeightIncrement(): number {
    return (this.circleBaselineOpeningHeight - this.buttonMaxOpeningHeight) / 30;
  }
}
