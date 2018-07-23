import { TestBed, async } from '@angular/core/testing';
import { RoomHttp, UnmappedRoom } from './room.http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomConfig, roomConfigToken } from './room.config';

const roomConfig: RoomConfig = {
  http: {
    GET_ALL: '/rooms'
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

  afterEach(() => httpMock.verify());
});
