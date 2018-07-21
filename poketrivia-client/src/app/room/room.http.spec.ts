import { TestBed, async } from '@angular/core/testing';
import { RoomHttp, UnmappedRoom } from './room.http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomConfig, roomConfigToken } from './room.config';
import { Session, SessionBuilder } from '../session/session.model';
import { Room, RoomBuilder } from './room.model';
import { CompilerConfig } from '../../../node_modules/@angular/compiler';

const roomConfig: RoomConfig = {
  http: {
    GET_ALL: '/rooms',
    JOIN_ROOM: (roomName: String) => `/join/${roomName}`
  }
};

describe('RoomHttp', () => {

  let roomHttp: RoomHttp;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RoomHttp,
        { provide: roomConfigToken, useValue: roomConfig }
      ]
    });

    roomHttp = TestBed.get(RoomHttp);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('#getAll', () => {
    it('makes a GET request to the configured endpoint', async(() => {
      roomHttp.getAll().subscribe();

      httpMock.expectOne({
        method: 'GET',
        url: roomConfig.http.GET_ALL
      });
    }));

    it('returns list of unmapped rooms returned from server', async(() => {
      const unmappedRooms: Array<UnmappedRoom> = [
        { mascotName: 'Pikachu' },
        { mascotName: 'Eevee' },
      ];

      roomHttp
        .getAll()
        .subscribe((rooms: Array<UnmappedRoom>) => {
          expect(rooms).toBe(unmappedRooms);
        });

      httpMock
        .expectOne(roomConfig.http.GET_ALL)
        .flush(unmappedRooms);
    }));
  });

  describe('#joinRoom', () => {

    let targetRoom: Room;

    beforeEach(() => {
      targetRoom = new RoomBuilder()
        .setName('EXAMPLE_ROOM_NAME')
        .build();
    });

    it('makes a post request to the configured endpoint', () => {
      roomHttp
        .joinRoom(targetRoom)
        .subscribe();

      httpMock.expectOne({
        url: roomConfig.http.JOIN_ROOM(targetRoom.name),
        method: 'POST'
      });
    });

    it('returns raw response from server endpoint as an unmapped room', () => {
      const unmappedRoom: UnmappedRoom = { mascotName: targetRoom.name };

      roomHttp
        .joinRoom(targetRoom)
        .subscribe((response) => {
          expect(response).toBe(unmappedRoom);
        });

      httpMock
        .expectOne(roomConfig.http.JOIN_ROOM(targetRoom.name))
        .flush(unmappedRoom);
    });
  });

  afterEach(() => httpMock.verify());
});
