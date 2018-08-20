import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { Component, Input } from '@angular/core';
import { GameService } from './game.service';
import { ActivatedRoute } from '@angular/router';
import { GameStore } from './game.store';
import { Observable } from 'rxjs/Observable';

@Component({ selector: 'pkt-game-narrator', template: '' })
class GameNarratorComponent { @Input() game; }

@Component({ selector: 'pkt-scores', template: '' })
class ScoresComponent { @Input() players; }

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let gameServiceMock: any;
  let activatedRouteMock: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        GameNarratorComponent,
        ScoresComponent
      ],
      providers: [
        {
          provide: GameService,
          useValue: jasmine.createSpyObj('gameService', ['fetchGame'])
        },
        {
          provide: ActivatedRoute,
          useValue: jasmine.createSpyObj('activatedRoute', ['snapshot'])
        }
      ]
    })
    .compileComponents();

    gameServiceMock = TestBed.get(GameService);
    activatedRouteMock = TestBed.get(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  beforeEach(() => {
    gameServiceMock.gameStorageUpdates = new Observable<GameStore>();

    activatedRouteMock.snapshot = {
      params: { roomName: 'EXMAPLE_ROOM_NAME' }
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
