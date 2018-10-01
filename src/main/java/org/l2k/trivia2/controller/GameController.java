package org.l2k.trivia2.controller;

import javax.servlet.http.HttpSession;

import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.game.Game;
import org.l2k.trivia2.service.GameService;
import org.l2k.trivia2.service.P2PSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class GameController {

	private GameService gameService;
	private P2PSessionService sessionService;
	
	@Autowired
	public GameController(GameService gameService, P2PSessionService sessionService) {
		this.gameService = gameService;
		this.sessionService = sessionService;
	}
	
	@GetMapping(path="/game/{roomName}")
	public ResponseEntity<Game> getGame(@PathVariable String roomName) {
		Game game = gameService.getGame(roomName);
		
		ResponseEntity<Game> response;
		if (game != null) {
			response = ResponseEntity.ok(game);			
		} else {
			response = ResponseEntity.notFound().build();
		}
		
		return response;
	}
	
	@PostMapping(path="/game/{roomName}/submit")
	public ResponseEntity<Game> submitAnswer(
		@PathVariable String roomName, 
		@RequestBody String answerName,
		HttpSession session
	) {
		P2PSession player = sessionService.get(session.getId());
		gameService.submitAnswer(roomName, player, answerName);
		return ResponseEntity.ok().build();
	}
	
}
