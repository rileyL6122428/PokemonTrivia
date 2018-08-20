import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresComponent } from './scores.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'pkt-score-card',
  template: ''
})
class ScoreCardComponent {
  @Input() player;
}

describe('ScoresComponent', () => {
  let component: ScoresComponent;
  let fixture: ComponentFixture<ScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScoresComponent,
        ScoreCardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
