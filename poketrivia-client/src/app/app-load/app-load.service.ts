import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RoomService } from '../room/room.service';
import { PokemonService } from '../pokemon/pokemon.service';
import { SessionService } from '../session/session.service';
import { forkJoin } from 'rxjs/Observable/forkJoin';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AppLoadService {

  constructor(
    private roomService: RoomService,
    private pokemonService: PokemonService,
    private sessionService: SessionService
  ) { }

  fetchAllResources(): Observable<boolean> {
    return forkJoin(
      this.roomService.fetchAll(),
      this.pokemonService.fetchPokemon(),
      this.sessionService.openConnections()
    )
    .pipe(map((successFlags: Array<boolean>) => {
      return successFlags.every(successFlag => successFlag);
    }));
  }

}
