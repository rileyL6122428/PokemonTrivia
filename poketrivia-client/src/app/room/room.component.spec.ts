import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComponent } from './room.component';
import { ReusableUIModule } from '../reusable-ui/reusable-ui.module';
import { RoomService } from './room.service';
import { RoomUITransition } from '../animations/room-ui.transition';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'pkt-game',
  template: ''
})
export class GameComponent { }

describe('RoomComponent', () => {
  let component: RoomComponent;
  let fixture: ComponentFixture<RoomComponent>;
  let roomServiceMock: RoomService;
  let roomUITransitionMock: RoomUITransition;
  let activatedRouteMock: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReusableUIModule ],
      declarations: [ RoomComponent, GameComponent ],
      providers: [
        {
          provide: RoomService,
          useValue: jasmine.createSpyObj('roomService', [''])
        },
        {
          provide: RoomUITransition,
          useValue: jasmine.createSpyObj('roomUITransition', [''])
        },
        {
          provide: ActivatedRoute,
          useValue: jasmine.createSpyObj('activatedRoute', [''])
        }
      ]
    })
    .compileComponents();

    roomServiceMock = TestBed.get(RoomService);
    roomUITransitionMock = TestBed.get(RoomUITransition);
    activatedRouteMock = TestBed.get(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
