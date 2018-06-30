import { Component } from '@angular/core';
import { SessionService } from './session/session.service';
import { PokemonService } from './pokemon/pokemon.service';
import { RoomService } from './room/room.service';
import { forkJoin } from 'rxjs/Observable/forkJoin';
import { Pokemon } from './pokemon/pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
