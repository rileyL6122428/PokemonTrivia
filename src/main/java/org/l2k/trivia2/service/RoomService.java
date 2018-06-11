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

	public List<Room> getRooms() {
		return roomRepository.getAll();
	}

}
