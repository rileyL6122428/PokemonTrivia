import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakingComponent } from './matchmaking.component';
import { MatchmakingService } from './matchmaking.service';
import { Room } from '../room/room.model';
import { Router } from '@angular/router';
import { SafeHtmlPipe } from '../html-interpolation/safe.pipe';
import { Pokemon } from '../pokemon/pokemon.model';

describe('MatchmakingComponent', () => {
  let matchmakingComponent: MatchmakingComponent;
  let domRoot: HTMLElement;
  let fixture: ComponentFixture<MatchmakingComponent>;
  let matchmakingServiceMock: any;
  let rooms: Array<Room>;
  let routerMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakingComponent, SafeHtmlPipe ],
      providers: [
        {
          provide: MatchmakingService,
          useValue: jasmine.createSpyObj('matchmakingService', ['allRooms'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('router', ['navigateByUrl'])
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    _stubMatchmakingService();
    routerMock = TestBed.get(Router);
  });

  it('should create', () => {
    _affixComponent();
    expect(matchmakingComponent).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('gets all rooms fetched from app load', () => {
      _affixComponent();
      expect(matchmakingServiceMock.allRooms).toHaveBeenCalled();
      expect(matchmakingComponent.rooms).toBe(rooms);
    });

    it('adds a room button to the view for each fetched room', () => {
      _affixComponent();

      const roomButtons: Array<Element> = Array.from(domRoot.querySelectorAll('button.room-button'));
      expect(roomButtons.length).toBe(2);
      expect(roomButtons[0].id).toBe('pikachu-room-button');
      expect(roomButtons[1].id).toBe('eevee-room-button');
    });

    it('redirects back to app load if rooms haven\'t been fetched', async(() => {
      matchmakingServiceMock.allRooms.and.returnValue([]);
      _affixComponent();
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
    }));
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
      new Room('pikachu', () => new Pokemon('Pikachu', '', '')),
      new Room('eevee', () => new Pokemon('Eevee', '', '')),
    ];
    matchmakingServiceMock.allRooms.and.returnValue(rooms);
  }
});
