import { Injectable } from '@angular/core';
import { Room } from './room.model';
import { RoomHttp, UnmappedRoom } from './room.http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { catchError } from 'rxjs/operators/catchError';
import { RoomAdapter } from './room.adapter';
import { RoomStore } from './room.store';

@Injectable()
export class RoomService {

  constructor(
    private http: RoomHttp,
    private adapter: RoomAdapter,
    private store: RoomStore
  ) { }

  fetchAll(): Observable<boolean> {
    return this.http
      .getAll()
      .pipe(map(
        (unmappedRooms: Array<UnmappedRoom>) => this.adapter.mapRooms(unmappedRooms)
      ))
      .pipe(tap(
        (mappedRooms: Array<Room>) => this.store.depositList(mappedRooms)
      ))
      .pipe(map(
        () => true
      ))
      .pipe(catchError(
        () => of(false)
      ));
  }

  allRooms(): Array<Room> {
    return this.store.retrieveAll();
  }

}
