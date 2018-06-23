import { TestBed } from '@angular/core/testing';
import { RoomStore } from './room.store';
import { Room } from './room.model';

describe('RoomStore', () => {

  let roomStore: RoomStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoomStore
      ]
    });

    roomStore = TestBed.get(RoomStore);
  });

  describe('#deposit', () => {
    it('places Room for later retrieval', () => {
      const room: Room = new Room('Eevee', null);

      roomStore.deposit(room);

      const retrieved: Room = roomStore.retrieveByName(room.name);
      expect(retrieved).toBe(room);
    });
  });

});
