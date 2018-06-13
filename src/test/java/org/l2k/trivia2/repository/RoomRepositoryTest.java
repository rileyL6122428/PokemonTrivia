package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.l2k.trivia2.domain.Room;

class RoomRepositoryTest {
	
	private RoomRepository roomRepository;
	private Map<String, Room> rooms;
	
	@BeforeEach
	void setup() {
		Room room1 = new Room.Builder().setName("ROOM1").build();
		Room room2 = new Room.Builder().setName("ROOM2").build();
		rooms = new HashMap<String, Room>() {{ 
			put(room1.getMascotName(), room1); 
			put(room2.getMascotName(), room2); 
		}};
		
		roomRepository = new RoomRepository(rooms);
	}
	
	@Nested
	class GetAll {
		
		@Test
		void returnsAllRoomInTheRepository() {
			List<Room> returnedRooms = roomRepository.getAll();
			
			assertEquals(rooms.size(), returnedRooms.size());
			assertTrue(returnedRooms.contains(rooms.get("ROOM1")));
			assertTrue(returnedRooms.contains(rooms.get("ROOM2")));
		}
		
	}
}
