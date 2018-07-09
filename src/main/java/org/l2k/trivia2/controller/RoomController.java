package org.l2k.trivia2.controller;

import java.util.List;

import org.l2k.trivia2.constants.ControllerConstants.PathVariables;
import org.l2k.trivia2.constants.ControllerConstants.Paths;
import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.Room;
import org.l2k.trivia2.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

	@PostMapping(Paths.JOIN_ROOM)
	public ResponseEntity<Room> joinRoom(
			@PathVariable(PathVariables.ROOM_NAME) String roomName, 
			@RequestBody P2PSession user
	) {
		Room room = roomService.joinRoom(roomName, user);
		return room != null ? ResponseEntity.ok(room) : ResponseEntity.status(HttpStatus.FORBIDDEN).body(room);
	}

}
