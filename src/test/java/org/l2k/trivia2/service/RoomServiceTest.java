package org.l2k.trivia2.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Room;
import org.l2k.trivia2.repository.RoomRepository;
import org.mockito.Mock;

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
	class GetAll {
		
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
			
			List<Room> returnedRooms = roomService.getAll();
			
			assertEquals(2, returnedRooms.size());
			assertEquals(rooms.get(0), returnedRooms.get(0));
			assertEquals(rooms.get(1), returnedRooms.get(1));
		}
	}
	
	@Nested
	class Get {
		
		@Mock Room room;
		
		@Test
		void returnsNullWhenRoomNameIsNull() {
			assertNull(roomService.get(null));
		}
		
		@Test
		void delegatesRoomRetrievalToRoomRepsository() {
			String roomName = "EXAMPLE_ROOM_NAME";
			when(roomRepository.get(roomName)).thenReturn(room);
			
			Room returnedRoom = roomService.get(roomName);
			
			assertEquals(room, returnedRoom);
		}
	}
	
	@Nested
	class Save {
		
		@Mock Room room;
		
		@Test
		void doesNotSaveRoomIfNull() {
			roomService.save(null);
			verify(roomRepository, never()).save(null);
		}
		
		@Test
		void doesNotSaveRoomIfMascotNameNull() {
			when(room.getMascotName()).thenReturn(null);
			roomService.save(room);
			verify(roomRepository, never()).save(null);
		}
		
		@Test
		void savesProvidedRoom() {
			when(room.getMascotName()).thenReturn("EXAMPLE_MASCOT_NAME");
			roomService.save(room);
			verify(roomRepository, times(1)).save(room);
		}
	}
}
