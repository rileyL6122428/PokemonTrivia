package org.l2k.trivia2.controller;

import javax.servlet.http.HttpSession;

import org.l2k.trivia2.constants.ControllerConstants.PathVariables;
import org.l2k.trivia2.constants.ControllerConstants.Paths;
import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.Room;
import org.l2k.trivia2.service.P2PSessionService;
import org.l2k.trivia2.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MatchmakingController {
	
	private RoomService roomService;
	private P2PSessionService sessionService;
	
	@Autowired
	public MatchmakingController(RoomService roomService, P2PSessionService sessionService) {
		this.roomService = roomService;
		this.sessionService = sessionService;
	}

	@PostMapping(Paths.JOIN_ROOM)
	public ResponseEntity<Room> joinRoom(
			@PathVariable(PathVariables.ROOM_NAME) String roomName, 
			HttpSession session
	) {
		P2PSession p2PSession = sessionService.get(session.getId());
		Room room = roomService.get(roomName);
		HttpStatus status;
		
		if (p2PSession == null || room == null) {
			status = HttpStatus.NOT_FOUND;
		} else if (!room.hasVacancies()) {
			status = HttpStatus.FORBIDDEN;
		} else {
			status = HttpStatus.OK;
			room.addUser(p2PSession);
			roomService.save(room);
		}

		return ResponseEntity.status(status).body(room);
	}
	
}
