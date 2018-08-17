package org.l2k.trivia2.service;

import org.l2k.trivia2.domain.Game;
import org.l2k.trivia2.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {
	
	private GameRepository repository;
	
	@Autowired
	public GameService(GameRepository repository) {
		this.repository = repository;
	}
	
	public Game getGame(String roomName) {
		return repository.getGame(roomName);
	}
	
}
