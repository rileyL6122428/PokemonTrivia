import { Component, OnInit } from '@angular/core';
import { Room } from '../room/room.model';
import { MatchmakingService } from './matchmaking.service';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss']
})
export class MatchmakingComponent implements OnInit {

  rooms: Array<Room>;

  constructor(
    private matchmakingService: MatchmakingService
  ) { }

  ngOnInit() {
    debugger
    this.rooms = this.matchmakingService.allRooms();
  }

}
