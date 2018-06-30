import { TestBed, inject } from '@angular/core/testing';

import { MatchmakingService } from './matchmaking.service';
import { RoomService } from '../room/room.service';
import { Room } from '../room/room.model';

describe('MatchmakingService', () => {

  let matchmakingService: MatchmakingService;
  let roomServiceMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatchmakingService,
        {
          provide: RoomService,
          useValue: jasmine.createSpyObj('roomService', ['allRooms'])
        }
      ]
    });

    matchmakingService = TestBed.get(MatchmakingService);
    roomServiceMock = TestBed.get(RoomService);
  });

  describe('#allRooms', () => {
    it('delegates getting allRooms to the roomService', () => {
      const rooms = [
        new Room('Pikachu', null),
        new Room('Eevee', null)
      ];
      roomServiceMock.allRooms.and.returnValue(rooms);

      const returnedRooms = matchmakingService.allRooms();

      expect(roomServiceMock.allRooms).toHaveBeenCalled();
      expect(returnedRooms).toBe(rooms);
    });
  });
});
