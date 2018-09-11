import { Component, Input } from '@angular/core';
import { Player } from '../../game/game.model';
import { SessionService } from '../../session/session.service';

@Component({
  selector: 'pkt-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent {

  @Input() players: Array<Player>;

  constructor(
    private sessionService: SessionService
  ) { }

  get username(): string {
    return this.sessionService.username;
  }

}
