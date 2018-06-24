import { Injectable } from '@angular/core';
import { Room } from './room.model';

@Injectable()
export class RoomStore {

  private contents: Map<string, Room>;

  constructor() {
    this.contents = new Map<string, Room>();
  }

  deposit(room: Room): void {
    this.contents.set(room.name, room);
  }

  depositList(rooms: Array<Room>): void {
    rooms.forEach(room => this.deposit(room));
  }

  retrieveByName(name: string): Room {
    return this.contents.get(name);
  }

  retrieveAll(): Array<Room> {
    return Array.from(this.contents.values());
  }

}
