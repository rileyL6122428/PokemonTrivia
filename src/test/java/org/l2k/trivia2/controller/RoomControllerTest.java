package org.l2k.trivia2.controller;

import static org.junit.jupiter.api.Assertions.*;

import static java.util.Arrays.asList;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Room;
import org.l2k.trivia2.service.RoomService;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.*;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class RoomControllerTest {
	
	private RoomController roomController;
	
	@Mock private RoomService roomService;
	@Mock private Room room1;
	@Mock private Room room2;
	
	@BeforeEach
	void setup() {
		roomController = new RoomController(roomService);
	}
	
	@Nested
	class GetRooms {
		
		@BeforeEach
		void setup() {
			when(roomService.getRooms()).thenReturn(asList(room1, room2));			
		}
		
		@Test
		void returnsRoomsProvidedByRoomService() {
			ResponseEntity<List<Room>> response = roomController.getRooms();
			
			List<Room> rooms = response.getBody();
			assertEquals(2, rooms.size());
			assertEquals(room1, rooms.get(0));
			assertEquals(room2, rooms.get(1));
		}
		
		@Test
		void returns200Response() {
			ResponseEntity<List<Room>> response = roomController.getRooms();
			assertEquals(Response.SC_OK, response.getStatusCode());
		}
	}


}
