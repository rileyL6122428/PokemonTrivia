package org.l2k.trivia2.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.Room;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataStructureProviders {
	
	@Bean("EXPIRATION_SYNC_THRESHOLD")
	public long expirationSyncThreshold() {
		long twentySeconds = 20000;
		return twentySeconds;
	}
	
	@Bean("SESSIONS")
	public HashMap<String, P2PSession> sessions() {
		return new HashMap<String, P2PSession>();
	}
	
	@Bean("userNames")
	public LinkedList<String> userNames() {
		return new LinkedList<String>() {{
			add("RED");
			add("BLUE");
			add("MISSINGNO");
		}};
	}
	
	private List<Room> roomsAsList() {
		return new ArrayList<Room>() {{
			add(new Room.Builder().setName("ROOM_1").build());
			add(new Room.Builder().setName("ROOM_2").build());
		}};
	}
	
	@Bean("rooms")
	public Map<String, Room> rooms() {
		return new HashMap<String, Room>() {{
			for(Room room : roomsAsList()) {
				put(room.getName(), room);
			}
		}};
	}
}
