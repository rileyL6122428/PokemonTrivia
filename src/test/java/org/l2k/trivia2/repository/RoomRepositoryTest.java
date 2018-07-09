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
import org.l2k.trivia2.domain.Pokemon;
import org.l2k.trivia2.domain.Room;

class RoomRepositoryTest {
	
	private RoomRepository roomRepository;
	private Map<String, Room> rooms;
	
	private Room pikachuRoom = new Room.Builder().setMascot(new Pokemon.Builder().setName("PIKACHU").build()).build();
	private Room eeveeRoom = new Room.Builder().setMascot(new Pokemon.Builder().setName("EEVEE").build()).build();
	
	@BeforeEach
	void setup() {
		pikachuRoom = new Room.Builder().setMascot(new Pokemon.Builder().setName("PIKACHU").build()).build();
		eeveeRoom = new Room.Builder().setMascot(new Pokemon.Builder().setName("EEVEE").build()).build();
		
		rooms = new HashMap<String, Room>() {{ 
			put(pikachuRoom.getMascotName(), pikachuRoom); 
			put(eeveeRoom.getMascotName(), eeveeRoom); 
		}};
		
		roomRepository = new RoomRepository(rooms);
	}
	
	@Nested
	class GetAll {
		
		@Test
		void returnsCopiesOfAllRoomsInTheRepository() {
			List<Room> returnedRooms = roomRepository.getAll();
			
			assertEquals(rooms.size(), returnedRooms.size());
			for (Room roomCopy : returnedRooms) {
				Room originalRoom = rooms.get(roomCopy.getMascotName());
				assertEquals(originalRoom, roomCopy);
				assertNotSame(originalRoom, roomCopy);
			}
		}
		
	}
	
	@Nested
	class Get {
		
		@Test
		void returnsACloneOfRoomWithProvidedName() {
			Room pikachuRoomCopy = roomRepository.get(pikachuRoom.getMascotName());
			assertEquals(pikachuRoom, pikachuRoomCopy);
			assertNotSame(pikachuRoom, pikachuRoomCopy);
		}
	}
	
	@Nested
	class Save {
		
		@Test
		void savesRoomForLaterRetrieval() {
			Pokemon bulbasaur = new Pokemon.Builder().setName("Bulbasaur").build();
			Room bulbasaurRoom = new Room.Builder().setMascot(bulbasaur).build();
			
			roomRepository.save(bulbasaurRoom);
			Room bulbasaurRoomCopy = roomRepository.get(bulbasaurRoom.getMascotName());
			
			assertEquals(bulbasaurRoom, bulbasaurRoomCopy);
		}
	}
}