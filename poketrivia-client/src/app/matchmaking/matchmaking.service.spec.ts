import { TestBed, async } from '@angular/core/testing';
import { MatchmakingService } from './matchmaking.service';
import { RoomService } from '../room/room.service';
import { Room, RoomBuilder } from '../room/room.model';
import { Observable } from 'rxjs/Observable';
import { MatchmakingHttp, JoinRoomResponse } from './matchmaking.http';
import { Observer } from 'rxjs/Observer';
import { RoomUITransition, UICoordinates } from '../animations/room-ui.transition';
import { when } from '../test-utils/test-utils';

describe('MatchmakingService', () => {

  let matchmakingService: MatchmakingService;
  let roomServiceMock: RoomService;
  let matchmakingHttpMock: MatchmakingHttp;
  let roomUITransitionMock: RoomUITransition;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MatchmakingService,
        {
          provide: RoomService,
          useValue: jasmine.createSpyObj('roomService', ['allRooms', 'deposit'])
        },
        {
          provide: MatchmakingHttp,
          useValue: jasmine.createSpyObj('matchmakingHttp', ['join'])
        },
        {
          provide: RoomUITransition,
          useValue: jasmine.createSpyObj('roomUITransition', [''])
        }
      ]
    });

    matchmakingService = TestBed.get(MatchmakingService);
    roomServiceMock = TestBed.get(RoomService);
    matchmakingHttpMock = TestBed.get(MatchmakingHttp);
    roomUITransitionMock = TestBed.get(RoomUITransition);
  });

  describe('#allRooms', () => {
    it('delegates getting allRooms to the roomService', () => {
      const rooms = [
        new Room('Pikachu', null),
        new Room('Eevee', null)
      ];
      when(roomServiceMock.allRooms).returnValue(rooms);

      const returnedRooms = matchmakingService.allRooms();

      expect(roomServiceMock.allRooms).toHaveBeenCalled();
      expect(returnedRooms).toBe(rooms);
    });
  });

  describe('#join', () => {

    let targetRoom: Room;
    let serverResponse: JoinRoomResponse;
    let joinRoomObservable: Observable<JoinRoomResponse>;
    let joinRoomObserver: Observer<JoinRoomResponse>;

    beforeEach(() => {
      targetRoom = new RoomBuilder().setName('EXAMPLE_ROOM').build();
      joinRoomObservable = new Observable<JoinRoomResponse>(
        observer => joinRoomObserver = observer
      );
      when(matchmakingHttpMock.join).returnValue(joinRoomObservable);
      serverResponse = { room: { mascotName: 'EXAMPLE_ROOM' } };
    });

    it('delegates join room request to matchmakingHttp', () => {
      matchmakingService.joinRoom(targetRoom);
      expect(matchmakingHttpMock.join).toHaveBeenCalledWith(targetRoom);
    });

    it('delegates mapping of room in server response to roomService', async(() => {
      matchmakingService.joinRoom(targetRoom).subscribe();
      joinRoomObserver.next(serverResponse);
      expect(roomServiceMock.deposit).toHaveBeenCalledWith(serverResponse.room);
    }));

    it('emits true when errors not encountered', async(() => {
      matchmakingService
        .joinRoom(targetRoom)
        .subscribe((requestSuccessful) => {
          expect(requestSuccessful).toBe(true);
        });

      joinRoomObserver.next(serverResponse);
    }));

    it('emits false when errors encountered', async(() => {
      matchmakingService
        .joinRoom(targetRoom)
        .subscribe((requestSuccessful) => {
          expect(requestSuccessful).toBe(false);
        });

      joinRoomObserver.error('EXAMPLE ERROR');
    }));
  });

  describe('#captureButtonCoordinates', () => {
    it('sets coordinates on roomButtonUITransition', () => {
      const capturedCoords: UICoordinates = { top: 50, left: 100 };
      matchmakingService.captureButtonCoordinates(capturedCoords);
      expect(roomUITransitionMock.selectedRoomButtonCoords);
    });
  });
});
