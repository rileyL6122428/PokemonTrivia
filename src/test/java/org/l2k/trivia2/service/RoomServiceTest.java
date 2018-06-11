package org.l2k.trivia2.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Room;
import org.l2k.trivia2.repository.RoomRepository;
import org.mockito.Mock;
import static org.mockito.Mockito.*;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class RoomServiceTest {
	
	private RoomService roomService;
	@Mock private RoomRepository roomRepository;
	
	@BeforeEach
	void setup() {
		this.roomService = new RoomService(roomRepository);
	}

	@Nested
	class GetRooms {
		
		private List<Room> rooms;
		
		@BeforeEach
		void setup() {
			rooms = new ArrayList<Room>() {{
				add(new Room.Builder().build());
				add(new Room.Builder().build());
			}};
		}
		
		@Test
		void returnsAllRoomsInTheRoomRepository() {
			when(roomRepository.getAll()).thenReturn(rooms);
			
			List<Room> returnedRooms = roomService.getRooms();
			
			assertEquals(2, returnedRooms.size());
			assertEquals(rooms.get(0), returnedRooms.get(0));
			assertEquals(rooms.get(1), returnedRooms.get(1));
		}
	}
	

}
