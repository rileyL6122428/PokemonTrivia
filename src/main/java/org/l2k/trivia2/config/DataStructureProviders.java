package org.l2k.trivia2.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.l2k.trivia2.constants.PokemonConstants;
import org.l2k.trivia2.domain.Game;
import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.Pokemon;
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
		return PokemonConstants.ROOM_MASCOTS
				.stream()
				.map(pokemon -> { 
					return new Room.Builder()
							.setMascot(pokemon)
							.setUsers(new HashMap<String, P2PSession>())
							.build(); 
				})
				.collect(Collectors.toList());
	}
	
	@Bean("rooms")
	public Map<String, Room> rooms() {
		return new HashMap<String, Room>() {{
			for(Room room : roomsAsList()) {
				put(room.getMascotName(), room);
			}
		}};
	}
	
	@Bean("games")
	public Map<String, Game> games() {
		return new HashMap<String, Game>(){{
			for (Pokemon pokemon : PokemonConstants.ROOM_MASCOTS) {
				String mascotName = pokemon.getName();
				put(mascotName, new Game(mascotName));
			}
		}};
	}
	
	@Bean("pokemon")
	public List<Pokemon> pokemon() {
		return PokemonConstants.ROOM_MASCOTS;
	}
}
