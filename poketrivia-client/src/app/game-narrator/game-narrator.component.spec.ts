import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNarratorComponent } from './game-narrator.component';

describe('GameNarratorComponent', () => {
  let component: GameNarratorComponent;
  let fixture: ComponentFixture<GameNarratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameNarratorComponent ]
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
