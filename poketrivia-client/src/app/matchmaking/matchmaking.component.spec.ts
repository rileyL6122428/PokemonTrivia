import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakingComponent } from './matchmaking.component';
import { MatchmakingService } from './matchmaking.service';
import { Room } from '../room/room.model';

describe('MatchmakingComponent', () => {
  let matchmakingComponent: MatchmakingComponent;
  let domRoot: HTMLElement;
  let fixture: ComponentFixture<MatchmakingComponent>;
  let matchmakingServiceMock: any;
  let rooms: Array<Room>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakingComponent ],
      providers: [
        {
          provide: MatchmakingService,
          useValue: jasmine.createSpyObj('matchmakingService', ['allRooms'])
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    _stubMatchmakingService();
    _affixComponent();
  });

  it('should create', () => {
    expect(matchmakingComponent).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('gets all rooms fetched from app load', () => {
      expect(matchmakingServiceMock.allRooms).toHaveBeenCalled();
      expect(matchmakingComponent.rooms).toBe(rooms);
    });

    it('adds a room button to the view for each fetched room', () => {
      const roomButtons: Array<Element> = Array.from(domRoot.querySelectorAll('button.room-button'));

      expect(roomButtons.length).toBe(2);
      expect(roomButtons[0].id).toBe('pikachu-room-button');
      expect(roomButtons[1].id).toBe('eevee-room-button');
    });
  });

  function _affixComponent() {
    fixture = TestBed.createComponent(MatchmakingComponent);
    matchmakingComponent = fixture.componentInstance;
    domRoot = fixture.nativeElement;
    fixture.detectChanges();
  }

  function _stubMatchmakingService() {
    matchmakingServiceMock = TestBed.get(MatchmakingService);
    rooms = [
      new Room('pikachu', null),
      new Room('eevee', null),
    ];
    matchmakingServiceMock.allRooms.and.returnValue(rooms);
  }
});
