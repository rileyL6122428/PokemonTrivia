import { Component, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'pkt-progress-pie',
  templateUrl: './progress-pie.component.html',
  styleUrls: ['./progress-pie.component.scss']
})
export class ProgressPieComponent implements OnChanges {

  @ViewChild('progressPieCanvas') canvasRef: ElementRef;

  private _proportionCompleted: number;

  private remainingFillColor = 'white';
  private backgroundFillColor = 'black';

  @Input()
  set proportionCompleted(proportionCompleted: number) {
    if (proportionCompleted > 1) {
      this._proportionCompleted = 1;
    } else if (proportionCompleted < 0) {
      this._proportionCompleted = 0;
    } else {
      this._proportionCompleted = proportionCompleted;
    }
  }

  ngOnChanges(): void {
    this.clear();
    this.drawPieFill();
    this.drawPieProgress();
    this.drawPieOutline();
  }

  private clear(): void {
    this.ctx.fillStyle = this.remainingFillColor;
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.radius + 5,
      this.beginArcAngle,
      this.endArcAngle
    );
    this.ctx.fill();
  }

  private drawPieFill(): void {
    this.ctx.fillStyle = this.backgroundFillColor;
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      this.beginArcAngle,
      this.endArcAngle
    );
    this.ctx.fill();
  }

  private drawPieOutline(): void {
    this.ctx.fillStyle = this.backgroundFillColor;
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      this.beginArcAngle,
      this.endArcAngle
    );
    this.ctx.stroke();
  }

  private drawPieProgress(): void {
    this.ctx.fillStyle = this.remainingFillColor;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY - this.radius);
    this.ctx.lineTo(this.centerX, this.centerY);
    this.ctx.lineTo(this.progressPointOnArcX, this.progressPointOnArcY);
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      this.progressAngle,
      this.endArcAngle,
      true
    );
    this.ctx.fill();
  }

  private get ctx(): CanvasRenderingContext2D {
    return this.canvasRef.nativeElement.getContext('2d');
  }

  private get centerX(): number {
    return 105;
  }

  private get centerY(): number {
    return 105;
  }

  private get radius(): number {
    return 100;
  }

  private get progressAngle(): number {
    return (this.endArcAngle - this.beginArcAngle) * this._proportionCompleted + this.endArcAngle;
  }

  private get progressPointOnArcX(): number {
    return this.centerX + Math.cos(this.progressAngle) * this.radius;
  }

  private get progressPointOnArcY(): number {
    return this.centerY + Math.sin(this.progressAngle) * this.radius;
  }

  private get beginArcAngle(): number {
    return - Math.PI / 2;
  }

  private get endArcAngle(): number {
    return 3 * Math.PI / 2;
  }

}
