import { TestBed } from '@angular/core/testing';
import { MatchmakingService } from './matchmaking.service';
import { RoomService } from '../room/room.service';
import { Room, RoomBuilder } from '../room/room.model';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { MatchmakingHttp, JoinRoomResponse } from './matchmaking.http';
import { Observer } from '../../../node_modules/rxjs/Observer';

describe('MatchmakingService', () => {

  let matchmakingService: MatchmakingService;
  let roomServiceMock: any;
  let matchmakingHttpMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatchmakingService,
        {
          provide: RoomService,
          useValue: jasmine.createSpyObj('roomService', ['allRooms'])
        },
        {
          provide: MatchmakingHttp,
          useValue: jasmine.createSpyObj('matchmakingHttp', ['join'])
        }
      ]
    });

    matchmakingService = TestBed.get(MatchmakingService);
    roomServiceMock = TestBed.get(RoomService);
    matchmakingHttpMock = TestBed.get(MatchmakingHttp);
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

  describe('#join', () => {

    let targetRoom: Room;
    let joinRoomObservable: Observable<JoinRoomResponse>;
    let joinRoomObserver: Observer<JoinRoomResponse>;

    beforeEach(() => {
      targetRoom = new RoomBuilder().setName('EXAMPLE_ROOM').build();
      joinRoomObservable = new Observable<JoinRoomResponse>(
        observer => joinRoomObserver = observer
      );
      matchmakingHttpMock.join.and.returnValue(joinRoomObservable);
    });

    it('delegates join room request to matchmakingHttp', () => {
      matchmakingService.joinRoom(targetRoom);
      expect(matchmakingHttpMock.join).toHaveBeenCalledWith(targetRoom);
    });
  });
});
