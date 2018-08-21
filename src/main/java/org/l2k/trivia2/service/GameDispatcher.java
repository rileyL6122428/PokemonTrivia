package org.l2k.trivia2.service;

import org.l2k.trivia2.domain.Game;
import org.l2k.trivia2.domain.GameListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class GameDispatcher implements GameListener {
	
	private SimpMessagingTemplate messagingTemplate;
	
	@Autowired
	public GameDispatcher(SimpMessagingTemplate messagingTemplate) {
		this.messagingTemplate = messagingTemplate;
	}
	
	private void dispatchUpdate(Game game) {
		messagingTemplate.convertAndSend("/topic/game/" + game.getRoomName(), game);
	}

	@Override
	public void onUpdate(Game game) {
		dispatchUpdate(game);
	}
	
}
