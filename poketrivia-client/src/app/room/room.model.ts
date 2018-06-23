import { Pokemon } from '../pokemon/pokemon.model';

export class Room {

  constructor(
    private mascotGetter: () => Pokemon
  ) { }

  get mascot(): Pokemon {
    return this.mascotGetter();
  }

}
