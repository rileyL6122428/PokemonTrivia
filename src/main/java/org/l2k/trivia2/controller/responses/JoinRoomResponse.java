package org.l2k.trivia2.controller.responses;

import org.l2k.trivia2.domain.Room;

public class JoinRoomResponse {
	
	private Room room;
	
	public JoinRoomResponse(Room room) {
		this.room = room;
	}
	
	public Room getRoom() {
		return room;
	}
}
