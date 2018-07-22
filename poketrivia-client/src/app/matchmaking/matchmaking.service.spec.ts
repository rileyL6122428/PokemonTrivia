import { TestBed } from '@angular/core/testing';
import { MatchmakingService } from './matchmaking.service';
import { RoomService } from '../room/room.service';
import { Room, RoomBuilder } from '../room/room.model';
import { Observable } from '../../../node_modules/rxjs/Observable';

describe('MatchmakingService', () => {

  let matchmakingService: MatchmakingService;
  let roomServiceMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatchmakingService,
        {
          provide: RoomService,
          useValue: jasmine.createSpyObj('roomService', ['allRooms', 'join'])
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

  describe('#joinRoom', () => {

    let targetRoom: Room;
    let joinRoomObservable: Observable<boolean>;

    beforeEach(() => {
      targetRoom = new RoomBuilder().setName('EXAMPLE_ROOM').build();
      joinRoomObservable = new Observable<boolean>();
      roomServiceMock.join.and.returnValue(joinRoomObservable);
    });

    it('delegates join room request to roomService', () => {
      matchmakingService.joinRoom(targetRoom);
      expect(roomServiceMock.join).toHaveBeenCalledWith(targetRoom);
    });

    it('returns observable returned by roomService', () => {
      const returnedObservable = matchmakingService.joinRoom(targetRoom);
      expect(returnedObservable).toBe(joinRoomObservable);
    });
  });
});
