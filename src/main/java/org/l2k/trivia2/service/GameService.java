package org.l2k.trivia2.service;

import org.l2k.trivia2.domain.Game;
import org.l2k.trivia2.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class GameService {
	
	private GameRepository repository;
	private SimpMessagingTemplate messagingTemplate;
	
	@Autowired
	public GameService(GameRepository repository, SimpMessagingTemplate messagingTemplate) {
		this.repository = repository;
		this.messagingTemplate = messagingTemplate;
	}
	
	public Game getGame(String roomName) {
		return repository.getGame(roomName);
	}

	public void save(Game game) {
		repository.save(game);
		dispatchUpdate(game);
	}
	
	private void dispatchUpdate(Game game) {
		messagingTemplate.convertAndSend("/topic/game/" + game.getRoomName(), game);
	}
	
}
