import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'pkt-progress-pie',
  templateUrl: './progress-pie.component.html',
  styleUrls: ['./progress-pie.component.scss']
})
export class ProgressPieComponent implements OnInit {

  @ViewChild('progressPieCanvas') canvasRef: ElementRef;

  ngOnInit(): void {
    // this.ctx.strokeStyle('red');
    // this.ctx.strokeText('TESTING', 100, 100);
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, - Math.PI / 2, 3 * Math.PI / 2);
    this.ctx.stroke();

    const angle = 0;
    const xArcProgressPoint = this.centerX + Math.cos(angle) * this.radius;
    const yArcProgressPoint = this.centerY + Math.sin(angle) * this.radius;
    const absStartAngle = -0.5 * Math.PI;
    const absEndAngle = 1.5 * Math.PI;

    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY - this.radius);
    this.ctx.lineTo(this.centerX, this.centerY);
    this.ctx.lineTo(xArcProgressPoint, yArcProgressPoint);
    this.ctx.arc(this.centerX, this.centerY, this.radius, angle, absEndAngle, false);
    this.ctx.fill();
  }

  private get ctx(): CanvasRenderingContext2D {
    return this.canvasRef.nativeElement.getContext('2d');
  }

  private get centerX(): number {
    return 100;
  }

  private get centerY(): number {
    return 100;
  }

  private get radius(): number {
    return 100;
  }

}
