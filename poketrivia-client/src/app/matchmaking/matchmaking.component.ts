import { Component, OnInit } from '@angular/core';
import { Room } from '../room/room.model';
import { MatchmakingService } from './matchmaking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pkt-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss']
})
export class MatchmakingComponent implements OnInit {

  rooms: Array<Room>;

  constructor(
    private matchmakingService: MatchmakingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rooms = this.matchmakingService.allRooms();
    if (this.roomsEmpty) {
      this.router.navigateByUrl('/');
    }
  }

  private get roomsEmpty(): boolean {
    return !(this.rooms && this.rooms.length);
  }

  selectRoom(room: Room): void {
    console.log(`selected room: ${room.name}`);
  }

}
