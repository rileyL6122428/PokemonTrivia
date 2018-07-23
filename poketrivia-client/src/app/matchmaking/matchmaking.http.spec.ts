import { TestBed } from '@angular/core/testing';
import { MatchmakingHttp, JoinRoomResponse } from './matchmaking.http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { matchmakingConfigToken, MatchmakingConfig } from './matchmaking.config';
import { Room, RoomBuilder } from '../room/room.model';
import { UnmappedRoom } from '../room/room.http';

const matchmakingConfig: MatchmakingConfig = {
  errorMessageDurationMS: 1,
  joinRoomPath: (roomName: string) => `matchmaking/${roomName}`
};

describe('MatchmakingHttp', () => {

  let matchmakingHttp: MatchmakingHttp;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MatchmakingHttp,
        { provide: matchmakingConfigToken, useValue: matchmakingConfig }
      ]
    });

    matchmakingHttp = TestBed.get(MatchmakingHttp);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('#join', () => {

    let targetRoom: Room;

    beforeEach(() => {
      targetRoom = new RoomBuilder()
        .setName('EXAMPLE_ROOM_NAME')
        .build();
    });

    it('makes a post request to the configured endpoint', () => {
      matchmakingHttp
        .join(targetRoom)
        .subscribe();

      httpMock.expectOne({
        url: matchmakingConfig.joinRoomPath(targetRoom.name),
        method: 'POST'
      });
    });

    it('returns raw response from server endpoint with appropriate type', () => {
      const unmappedRoom: UnmappedRoom = { mascotName: 'EXAMPLE_NAME' };
      const response: JoinRoomResponse = { room: unmappedRoom };

      matchmakingHttp
        .join(targetRoom)
        .subscribe((returnedResponse) => {
          expect(returnedResponse).toBe(response);
        });

      httpMock
        .expectOne(matchmakingConfig.joinRoomPath(targetRoom.name))
        .flush(response);
    });
  });

});
