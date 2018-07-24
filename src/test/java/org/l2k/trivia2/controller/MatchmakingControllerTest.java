package org.l2k.trivia2.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.when;

import javax.servlet.http.HttpSession;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.controller.responses.JoinRoomResponse;
import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.Room;
import org.l2k.trivia2.service.P2PSessionService;
import org.l2k.trivia2.service.RoomService;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MatchmakingControllerTest {
	
	MatchmakingController matchmakingController;
	@Mock RoomService roomService;
	@Mock P2PSessionService sessionService;
	
	@BeforeEach
	void setup() {
		matchmakingController = new MatchmakingController(
			roomService, 
			sessionService
		);
	}
	
	
	@Nested
	class JoinRoom {
		
		@Mock HttpSession session;
		@Mock P2PSession user; 
		@Mock Room room;
		String sessionId = "EXAMPLE_SESSION_ID";
		String roomName = "EXAMPLE_ROOM_NAME";
		
		@BeforeEach
		void stubGetSession() {
			when(session.getId()).thenReturn(sessionId);
		}
		
		@Test
		void returnsRequestedRoomIfUserAbleToJoinTargetRoom() {
			when(sessionService.get(sessionId)).thenReturn(user);
			when(roomService.get(roomName)).thenReturn(room);
			when(room.hasVacancies()).thenReturn(true);
			
			ResponseEntity<JoinRoomResponse> response = matchmakingController.joinRoom(roomName, session);
			
			assertEquals(HttpStatus.OK, response.getStatusCode());
			assertEquals(room, response.getBody().getRoom());
		}
		
		@Test
		void addsUserToRoomAndSavesWhenUserMayJoinTargetRoom() {
			when(sessionService.get(sessionId)).thenReturn(user);
			when(roomService.get(roomName)).thenReturn(room);
			when(room.hasVacancies()).thenReturn(true);
			InOrder inOrder = inOrder(room, roomService);
			
			matchmakingController.joinRoom(roomName, session);
			
			inOrder.verify(room).addUser(user);
			inOrder.verify(roomService).save(room);
		}
		
		@Test
		void returns404WhenSessionCannotBeFound() {
			when(sessionService.get(sessionId)).thenReturn(null);
			when(roomService.get(roomName)).thenReturn(room);
			when(room.hasVacancies()).thenReturn(true);
			
			ResponseEntity<JoinRoomResponse> response = matchmakingController.joinRoom(roomName, session);
			
			assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
		}
		
		@Test
		void returns404WhenRoomCannotBeFound() {
			when(sessionService.get(sessionId)).thenReturn(user);
			when(roomService.get(roomName)).thenReturn(null);
			
			ResponseEntity<JoinRoomResponse> response = matchmakingController.joinRoom(roomName, session);
			
			assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
		}
		
		@Test
		void returns403WhenRoomCannotBeJoined() {
			when(sessionService.get(sessionId)).thenReturn(user);
			when(roomService.get(roomName)).thenReturn(room);
			when(room.hasVacancies()).thenReturn(false);
			
			ResponseEntity<JoinRoomResponse> response = matchmakingController.joinRoom(roomName, session);
			
			assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
		}
	}

}
