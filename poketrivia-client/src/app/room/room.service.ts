import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Room } from './room.model';
import { RoomHttp, UnmappedRoom } from './room.http';
import { map } from 'rxjs/operators/map';
import { RoomAdapter } from './room.adapter';

@Injectable()
export class RoomService {

  constructor(
    private http: RoomHttp,
    private adapter: RoomAdapter
  ) { }

  fetchAll(): Observable<boolean> {
    return this.http
      .getAll()
      .pipe(map(
        (unmapped: Array<UnmappedRoom>) => this.adapter.mapRooms(unmapped)
      ))
      .pipe(map(
        () => true
      ));
  }

  allRooms(): Array<Room> {
    return null;
  }

}
