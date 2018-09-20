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
    this.ctx.arc(100, 100, 100, - Math.PI / 2, 3 * Math.PI / 2);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(100, 100, 100, 0, 3 * Math.PI / 2);
    this.ctx.fill();
  }

  private get ctx(): CanvasRenderingContext2D {
    return this.canvasRef.nativeElement.getContext('2d');
  }

}
