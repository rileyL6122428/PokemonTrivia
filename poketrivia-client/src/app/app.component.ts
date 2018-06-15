import { Component } from '@angular/core';
import { SessionService } from './session/session.service';
import { PokemonHttp } from './pokemon/pokemon.http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    sessionService: SessionService,
    pokemonHttp: PokemonHttp
  ) {
    sessionService.openConnections()
      .subscribe(sessionRegistered => {
        console.log(`Session Registered: ${sessionRegistered}`);
      });

      pokemonHttp.fetchAll().subscribe((response) => {
        console.log(response);
      });
  }
}
