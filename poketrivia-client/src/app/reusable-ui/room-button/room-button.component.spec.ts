import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomButtonComponent } from './room-button.component';

describe('RoomButtonComponent', () => {
  let component: RoomButtonComponent;
  let fixture: ComponentFixture<RoomButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
