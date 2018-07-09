package org.l2k.trivia2.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.l2k.trivia2.domain.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class RoomRepository {

	private Map<String, Room> rooms;

	@Autowired
	public RoomRepository(@Qualifier("rooms") Map<String, Room> rooms) {
		this.rooms = rooms;
	}

	public List<Room> getAll() {
		ArrayList<Room> roomCopies = new ArrayList<Room>();
		for (String roomName : rooms.keySet()) {
			roomCopies.add(get(roomName));
		}
		return roomCopies;
	}

	public Room get(String roomName) {
		Room room = rooms.get(roomName);
		
		if (room != null) {
			Room roomCopy = new Room.Builder(room).build();
			return roomCopy;
		} else {			
			return null;
		}
	}

	public void save(Room room) {
		rooms.put(room.getMascotName(), room);
	}

}
