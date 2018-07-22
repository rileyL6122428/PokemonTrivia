import { Pokemon } from '../pokemon/pokemon.model';

export class Room {

  constructor(
    readonly name: string,
    private mascotGetter: () => Pokemon
  ) { }

  get mascot(): Pokemon {
    return this.mascotGetter();
  }

}

export class RoomBuilder {

  private name: string;
  private mascotGetter: () => Pokemon;

  setName(name: string): RoomBuilder {
    this.name = name; return this;
  }

  setMascotGetter(mascotGetter: () => Pokemon): RoomBuilder {
    this.mascotGetter = mascotGetter; return this;
  }

  build(): Room {
    return new Room(
      this.name,
      this.mascotGetter
    );
  }
}
