package org.l2k.trivia2.controller;

import org.l2k.trivia2.domain.Game;
import org.l2k.trivia2.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class GameController {

	private GameService gameService;
	
	@Autowired
	public GameController(GameService gameService) {
		this.gameService = gameService;
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
	
}
