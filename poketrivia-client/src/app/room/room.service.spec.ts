import { TestBed, async } from '@angular/core/testing';
import { RoomService } from './room.service';
import { RoomHttp, UnmappedRoom } from './room.http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Room } from './room.model';
import { RoomAdapter } from './room.adapter';
import { RoomStore } from './room.store';

describe('RoomService', () => {

  let roomService: RoomService;
  let roomHttpMock: any;
  let roomAdapterMock: any;
  let roomStoreMock: any;

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
        },
        {
          provide: RoomStore,
          useValue: jasmine.createSpyObj('roomStore', ['depositList'])
        }
      ]
    });

    roomService = TestBed.get(RoomService);
    roomHttpMock = TestBed.get(RoomHttp);
    roomAdapterMock = TestBed.get(RoomAdapter);
    roomStoreMock = TestBed.get(RoomStore);
  });

  describe('#fetchAll', () => {
    let fetchAllObserver: Observer<Array<UnmappedRoom>>;
    let unmappedRooms: Array<UnmappedRoom>;
    let mappedRooms: Array<Room>;

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

    it('passes mapped rooms to roomStore for storage', async(() => {
      roomService
        .fetchAll()
        .subscribe(() => {
          expect(roomStoreMock.depositList).toHaveBeenCalledWith(mappedRooms);
        });

      fetchAllObserver.next(unmappedRooms);
    }));

    it('returns true when no errors encountered in process', async(() => {
      roomService
        .fetchAll()
        .subscribe((successful: boolean) => {
          expect(successful).toBe(true);
        });

      fetchAllObserver.next(unmappedRooms);
    }));

    it('returns false when error encountered', async(() => {
      roomService
        .fetchAll()
        .subscribe((successful: boolean) => {
          expect(successful).toBe(false);
        });

      fetchAllObserver.error('SERVER ERROR');
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

      mappedRooms = [
        new Room('Pikachu', null),
        new Room('Eevee', null)
      ];

      roomAdapterMock.mapRooms.and.returnValue(mappedRooms);
    }
  });
});
