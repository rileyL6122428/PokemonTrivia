import { TestBed, async } from '@angular/core/testing';
import { RoomService } from './room.service';
import { RoomHttp, UnmappedRoom } from './room.http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Room } from './room.model';
import { RoomAdapter } from './room.adapter';

describe('RoomService', () => {

  let roomService: RoomService;
  let roomHttpMock: any;
  let roomAdapterMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoomService,
        {
          provide: RoomHttp,
          useValue: jasmine.createSpyObj('roomHttp', ['getAll'])
        },
        {
          provide: RoomAdapter,
          useValue: jasmine.createSpyObj('roomAdapter', ['mapRooms'])
        }
      ]
    });

    roomService = TestBed.get(RoomService);
    roomHttpMock = TestBed.get(RoomHttp);
    roomAdapterMock = TestBed.get(RoomAdapter);
  });

  describe('#fetchAll', () => {
    let fetchAllObserver: Observer<Array<UnmappedRoom>>;
    let unmappedRooms: Array<UnmappedRoom>;

    beforeEach(() => {
      _stubRoomHttp();
      _stubRoomAdapter();
    });

    it('delegates retrieval of rooms to RoomHttp', () => {
      roomService.fetchAll().subscribe();
      expect(roomHttpMock.getAll).toHaveBeenCalled();
    });

    it('passes payload from roomHttp to roomAdapter for mapping', async(() => {
      roomService
        .fetchAll()
        .subscribe(() => {
          expect(roomAdapterMock.mapRooms).toHaveBeenCalledWith(unmappedRooms);
        });

      fetchAllObserver.next(unmappedRooms);
    }));

    function _stubRoomHttp() {
      roomHttpMock.getAll.and.returnValue(
        new Observable(observer => fetchAllObserver = observer
      ));
    }

    function _stubRoomAdapter() {
      unmappedRooms = [
        { mascotName: 'Pikachu' },
        { mascotName: 'Eevee' },
      ];
    }
  });
});
