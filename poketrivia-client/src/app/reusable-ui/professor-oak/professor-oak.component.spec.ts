import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorOakComponent } from './professor-oak.component';

describe('ProfessorOakComponent', () => {
  let component: ProfessorOakComponent;
  let fixture: ComponentFixture<ProfessorOakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorOakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorOakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
