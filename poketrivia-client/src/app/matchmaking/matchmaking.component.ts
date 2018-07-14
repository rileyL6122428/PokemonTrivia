import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Room } from '../room/room.model';
import { MatchmakingService } from './matchmaking.service';
import { Router } from '@angular/router';
import { matchmakingConfigToken, MatchmakingConfig } from './matchmaking.config';

@Component({
  selector: 'pkt-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss']
})
export class MatchmakingComponent implements OnInit {

  rooms: Array<Room>;
  selectedRoom: Room;
  errorMessage: string;

  constructor(
    private matchmakingService: MatchmakingService,
    private router: Router,
    private elementRef: ElementRef,
    @Inject(matchmakingConfigToken) private config: MatchmakingConfig
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
    if (this.attemptingToJoinRoom) { return; }

    this.selectedRoom = room;

    this.matchmakingService
      .joinRoom(room)
      .subscribe((successfullyJoinedRoom: boolean) => {
        successfullyJoinedRoom ?
          this.transitionTo(room) : this.handleFailedJoinRoomRequest(room);
      });
  }

  private get attemptingToJoinRoom(): boolean {
    return !!this.selectedRoom;
  }

  private transitionTo(room: Room): void {
    this.matchmakingService.captureButtonCoordinates(
      this.selectedRoomElement.getBoundingClientRect()
    );
    this.router.navigateByUrl(`/room/${room.name}`);
  }

  private get selectedRoomElement(): Element {
    return this
      .elementRef
      .nativeElement
      .querySelector(`#${this.selectedRoom.name}-room-button`);
  }

  private handleFailedJoinRoomRequest(room: Room): void {
    this.selectedRoom = null;
    this.errorMessage = `Unable to join ${room.name} Room at this time.`;
    setTimeout(() => this.errorMessage = '', this.config.errorMessageDurationMS);
  }
}
