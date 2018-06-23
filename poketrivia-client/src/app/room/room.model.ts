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
