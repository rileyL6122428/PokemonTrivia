import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeballEscapeAnimationComponent } from './pokeball-escape-animation.component';

describe('PokeballEscapeAnimationComponent', () => {
  let component: PokeballEscapeAnimationComponent;
  let fixture: ComponentFixture<PokeballEscapeAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokeballEscapeAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeballEscapeAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
