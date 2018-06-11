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
		return new ArrayList<Room>(rooms.values());
	}

}
