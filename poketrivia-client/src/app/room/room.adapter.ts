import { Injectable } from '@angular/core';
import { UnmappedRoom } from './room.http';
import { Room } from './room.model';
import { PokemonStore } from '../pokemon/pokemon.store';

@Injectable()
export class RoomAdapter {

  constructor(
    private pokemonStore: PokemonStore
  ) { }

  mapRoom(unmapped: UnmappedRoom): Room {
    return new Room(
      unmapped.mascotName,
      () => this.pokemonStore.getByName(unmapped.mascotName)
    );
  }

  mapRooms(unmappedRooms: Array<UnmappedRoom>): Array<Room> {
    return unmappedRooms.map((unmappedRoom: UnmappedRoom) => {
      return this.mapRoom(unmappedRoom);
    });
  }

}
