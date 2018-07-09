package org.l2k.trivia2.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.Room;
import org.l2k.trivia2.repository.RoomRepository;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.mockito.Mockito;

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
	
	@Nested
	class JoinRoom {
		
		@Mock Room room;
		@Mock P2PSession user;
		final String roomName = "EXAMPLE_ROOM_NAME";
		
		@BeforeEach
		void setup() {
			when(roomRepository.get(roomName)).thenReturn(room);			
		}
		
		@Test
		void addsSessionToRoomWhenRoomHasVacancies() {
			when(room.hasVacancies()).thenReturn(true);
			roomService.joinRoom(roomName, user);
			verify(room, times(1)).addUser(user);
		}
		
		@Test
		void savesTheUpdatedRoomAfterAddingUser() {
			when(room.hasVacancies()).thenReturn(true);
			InOrder inOrder = inOrder(room, roomRepository);
			
			roomService.joinRoom(roomName, user);
			
			inOrder.verify(room, times(1)).addUser(user);
			inOrder.verify(roomRepository, times(1)).save(room);
		}
		
		@Test
		void returnsRoomWhenUserIsAdded() {
			when(room.hasVacancies()).thenReturn(true);
			Room returnedRoom = roomService.joinRoom(roomName, user);
			assertEquals(room, returnedRoom);
		}
		
		@Test
		void returnsNullWhenUserCannotBeAddedToTheRoom() {
			when(room.hasVacancies()).thenReturn(false);
			Room returnedRoom = roomService.joinRoom(roomName, user);
			assertNull(returnedRoom);
		}
	}
}
