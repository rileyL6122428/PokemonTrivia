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

});
