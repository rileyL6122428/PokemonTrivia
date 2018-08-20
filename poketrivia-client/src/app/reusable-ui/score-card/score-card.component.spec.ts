import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCardComponent } from './score-card.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'pkt-point-counter',
  template: ''
})
class PointCounterComponent {
  @Input() point;
}

describe('ScoreCardComponent', () => {
  let component: ScoreCardComponent;
  let fixture: ComponentFixture<ScoreCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScoreCardComponent,
        PointCounterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
