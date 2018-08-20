import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNarratorComponent } from './game-narrator.component';
import { Component, Input } from '@angular/core';

@Component({ selector: 'pkt-professor-oak', template: '' })
class ProfessorOakComponent { }

@Component({ selector: 'pkt-speech-bubble', template: '' })
class SpeechBubbleComponent { }

describe('GameNarratorComponent', () => {
  let component: GameNarratorComponent;
  let fixture: ComponentFixture<GameNarratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameNarratorComponent,
        ProfessorOakComponent,
        SpeechBubbleComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameNarratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
