import { TestBed } from '@angular/core/testing';
import { RoomAdapter } from './room.adapter';
import { UnmappedRoom } from './room.http';
import { Room } from './room.model';
import { Pokemon } from '../pokemon/pokemon.model';
import { PokemonStore } from '../pokemon/pokemon.store';

describe('RoomAdapter', () => {

  let roomAdapter: RoomAdapter;
  let pokemonStoreMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoomAdapter,
        {
          provide: PokemonStore,
          useValue: jasmine.createSpyObj('pokemonStore', ['getByName'])
        }
      ]
    });

    roomAdapter = TestBed.get(RoomAdapter);
    pokemonStoreMock = TestBed.get(PokemonStore);
  });

  describe('#mapRoom', () => {
    let unmappedRoom: UnmappedRoom;

    beforeEach(() => {
      unmappedRoom = { mascotName: 'Eevee' };
    });

    it('maps mascotName to name', () => {
      const room: Room = roomAdapter.mapRoom(unmappedRoom);
      expect(room.name).toEqual(unmappedRoom.mascotName);
    });

    it('attaches mascotGetter that retrieves mascot from pokemonStore by room name', () => {
      const eevee: Pokemon = new Pokemon(unmappedRoom.mascotName, '', '');
      pokemonStoreMock.getByName.and.returnValue(eevee);

      const room: Room = roomAdapter.mapRoom(unmappedRoom);
      const mascot: Pokemon = room.mascot;

      expect(pokemonStoreMock.getByName).toHaveBeenCalledWith(unmappedRoom.mascotName);
      expect(mascot).toBe(eevee);
    });
  });

  describe('#mapRooms', () => {
    let unmappedRooms: Array<UnmappedRoom>;
    let mappedRooms: Array<Room>;

    beforeEach(() => {
      unmappedRooms = [
        { mascotName: 'Pikachu' },
        { mascotName: 'Eevee' }
      ];

      mappedRooms = unmappedRooms.map((unmapped) => {
        return new Room(unmapped.mascotName, null);
      });
    });

    it('maps list of rooms according to mapping rules of #mapRoom', () => {
      spyOn(roomAdapter, 'mapRoom').and.returnValues(...mappedRooms);

      const rooms = roomAdapter.mapRooms(unmappedRooms);

      expect(rooms.length).toEqual(unmappedRooms.length);
      rooms.forEach((room: Room, index: number) => {
        expect(roomAdapter.mapRoom).toHaveBeenCalledWith(unmappedRooms[index]);
        expect(room.name).toEqual(unmappedRooms[index].mascotName);
      });
    });
  });

});
