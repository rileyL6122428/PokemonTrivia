package org.l2k.trivia2.service;

import java.util.List;

import org.l2k.trivia2.domain.Room;
import org.l2k.trivia2.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

	private RoomRepository roomRepository;

	@Autowired
	public RoomService(RoomRepository roomRepository) {
		this.roomRepository = roomRepository;
	}

	public List<Room> getAll() {
		return roomRepository.getAll();
	}

	public Room get(String roomName) {
		return roomName == null ? null : roomRepository.get(roomName);
	}

	public void save(Room room) {
		if (room != null && room.getMascotName() != null) {
			roomRepository.save(room);
		}
	}

}
