import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakingComponent } from './matchmaking.component';
import { MatchmakingService } from './matchmaking.service';
import { Room } from '../room/room.model';

describe('MatchmakingComponent', () => {
  let matchmakingComponent: MatchmakingComponent;
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
  });

  function _affixComponent() {
    fixture = TestBed.createComponent(MatchmakingComponent);
    matchmakingComponent = fixture.componentInstance;
    fixture.detectChanges();
  }

  function _stubMatchmakingService() {
    matchmakingServiceMock = TestBed.get(MatchmakingService);
    rooms = [
      new Room('Pikachu', null),
      new Room('Eevee', null),
    ];
    matchmakingServiceMock.allRooms.and.returnValue(rooms);
  }
});
