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

  describe('#depositList', () => {
    let rooms: Array<Room>;

    beforeEach(() => {
      rooms = [
        new Room('Pikachu', null),
        new Room('Eevee', null)
      ];
    });

    it('iterates list and delegates depositing room to #deposit', () => {
      spyOn(roomStore, 'deposit');

      roomStore.depositList(rooms);

      expect(roomStore.deposit).toHaveBeenCalledTimes(rooms.length);
      rooms.forEach(room => expect(roomStore.deposit).toHaveBeenCalledWith(room));
    });
  });

  describe('#retrieveAll', () => {
    it('retrieves all rooms deposited into the store', () => {
      const pikachuRoom = new Room('Pikachu', null);
      const eeveeRoom = new Room('Eevee', null);
      roomStore.deposit(pikachuRoom);
      roomStore.deposit(eeveeRoom);

      const storeContents = roomStore.retrieveAll();

      expect(storeContents.length).toBe(2);
      expect(storeContents).toContain(pikachuRoom);
      expect(storeContents).toContain(eeveeRoom);
    });
  });

});
