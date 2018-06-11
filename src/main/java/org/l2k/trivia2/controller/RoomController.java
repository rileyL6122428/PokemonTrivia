package org.l2k.trivia2.controller;

import java.util.List;

import org.l2k.trivia2.domain.Room;
import org.l2k.trivia2.service.RoomService;
import org.springframework.http.ResponseEntity;

public class RoomController {

	private RoomService roomService;

	public RoomController(RoomService roomService) {
		this.roomService = roomService;
	}

	public ResponseEntity<List<Room>> getRooms() {
		return ResponseEntity.ok(roomService.getRooms());
	}

}
