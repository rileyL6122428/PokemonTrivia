package org.l2k.trivia2.service;

import static org.l2k.trivia2.constants.PokemonConstants.POKEMON_BY_NAME;
import org.l2k.trivia2.domain.Game;
import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.Pokemon;
import org.l2k.trivia2.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	public void submitAnswer(String roomName, P2PSession player, String answerName) {
		Game game = getGame(roomName);
		Pokemon answer = POKEMON_BY_NAME.get(answerName);
		
		if (game != null) {
			game.submitAnswer(player, answer);
		}
	}
	
}
