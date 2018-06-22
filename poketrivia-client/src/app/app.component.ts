import { Component } from '@angular/core';
import { SessionService } from './session/session.service';
import { PokemonService } from './pokemon/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    sessionService: SessionService,
    pokemonService: PokemonService
  ) {
    sessionService
      .openConnections()
      .subscribe(sessionRegistered => {
        console.log(`Session Registered: ${sessionRegistered}`);
      });

    pokemonService
      .fetchPokemon()
      .subscribe(pokemonFetched => {
        if (pokemonFetched) {
          console.log(pokemonService.getByName('Eevee'));
        }
      });
  }
}
