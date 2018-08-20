package org.l2k.trivia2.repository;

import java.util.Map;

import org.l2k.trivia2.domain.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class GameRepository {
	
	private Map<String, Game> roomNamesToGames;
	
	public GameRepository(@Autowired @Qualifier("games") Map<String, Game> roomNamesToGames) {
		this.roomNamesToGames = roomNamesToGames;
	}
	
	public Game getGame(String roomName) {
		return roomNamesToGames.get(roomName);
	}

	public void save(Game game) {
		roomNamesToGames.put(game.getRoomName(), game);
	}
	
}
