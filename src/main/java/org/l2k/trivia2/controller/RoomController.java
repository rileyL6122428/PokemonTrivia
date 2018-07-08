package org.l2k.trivia2.controller;

import java.util.List;

import org.l2k.trivia2.constants.ControllerConstants.Paths;
import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.Room;
import org.l2k.trivia2.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RoomController {

	private RoomService roomService;

	@Autowired
	public RoomController(RoomService roomService) {
		this.roomService = roomService;
	}

	@GetMapping(Paths.ROOMS)
	public ResponseEntity<List<Room>> getRooms() {
		return ResponseEntity.ok(roomService.getRooms());
	}

	public ResponseEntity<Room> joinRoom(String roomName, P2PSession user) {
		Room room = roomService.joinRoom(roomName, user);
		return room != null ? ResponseEntity.ok(room) : ResponseEntity.status(403).body(room);
	}

}
