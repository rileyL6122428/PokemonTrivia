package org.l2k.trivia2.service;

import org.l2k.trivia2.domain.Game;
import org.l2k.trivia2.domain.GameListener;
import org.l2k.trivia2.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import net.bytebuddy.agent.builder.AgentBuilder.InitializationStrategy.Dispatcher;

@Service
public class GameService {
	
	private GameRepository repository;
	private GameDispatcher dispatcher;
	
	@Autowired
	public GameService(
			GameRepository repository, GameDispatcher dispatcher) {
		this.repository = repository;
		this.dispatcher = dispatcher;
	}
	
	public Game getGame(String roomName) {
		return repository.getGame(roomName);
	}

	public void save(Game game) {
		repository.save(game);
	}
	
}
