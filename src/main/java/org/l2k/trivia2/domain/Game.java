package org.l2k.trivia2.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.l2k.trivia2.constants.PokemonConstants;
import org.l2k.trivia2.scheduler.DelayedEvent;
import org.l2k.trivia2.scheduler.SequenceBuilder;

public class Game {
	
	enum Phase {
		NOT_STARTED("NOT_STARTED"),
		STARTED("STARTED"),
		ASKING_QUESTION("ASKING_QUESTION"),
		REVEALING_ANSWER("REVEALING_ANSWER");
	 
	    private String stringRep;
	 
	    private Phase(String toString) {
	        this.stringRep = toString;
	    }
	    
	    public String getAsString() {
	    		return this.stringRep; 
	    }
	}
	
	private Phase phase;
	private Map<String, Long> playerNamesToScores;
	private String roomName;
	private List<GameListener> listeners;
	private Question currentQuestion;
	
	public Game(String roomName, List<GameListener> listeners) {
		this.roomName = roomName;
		this.phase = Phase.NOT_STARTED;
		this.playerNamesToScores = new HashMap<String, Long>();
		this.listeners = listeners;
	}

	public Map<String, Long> getPlayerNamesToScores() {
		return playerNamesToScores;
	}
	
	public Phase getPhase() {
		return phase;
	}
	
	public String getRoomName() {
		return roomName;
	}

	public void addUser(P2PSession p2PSession) {
		this.playerNamesToScores.put(p2PSession.getName(), 0l);
		if (playerTotal() > 1) {
			startGame();
		}
	}
	
	private int playerTotal() {
		return playerNamesToScores.size();
	}
	
	public Question getCurrentQuestion() {
		return currentQuestion;
	}
	
	public void submitAnswer(P2PSession player, Pokemon answer) {
		if (phase == Phase.ASKING_QUESTION && isInRoom(player)) {
			currentQuestion.submitAnswer(player.getName(), answer);
		}
	}
	
	public String getCorrectAnswer() {
		return phase == Phase.REVEALING_ANSWER ? currentQuestion.getCorrectAnswerName() : null;
	}
	
	private boolean isInRoom(P2PSession player) {
		return player != null && playerNamesToScores.containsKey(player.getName());
	}
	
	private void startGame() {
		new SequenceBuilder()
			.addEvent(new DelayedEvent(
				() -> { 
					phase = Phase.STARTED;
					notifyListeners();
				}, 
				2000
			))
			.addEvent(new DelayedEvent(
				() -> { 
					currentQuestion = new Question.Builder()
						.setDescription("Which of the following pokemon is a grass type?")
						.setCorrectAnswer(PokemonConstants.BULBASAUR)
						.addIncorrectAnswer(PokemonConstants.CHARMANDER)
						.addIncorrectAnswer(PokemonConstants.SQUIRTLE)
						.build();
					
					phase = Phase.ASKING_QUESTION;
					notifyListeners();
				}, 
				5000
			))
			.addEvent(new DelayedEvent(
					() -> { 
						currentQuestion
							.playersWithCorrectAnswers()
							.forEach(this::incrementScore);
						
						phase = Phase.REVEALING_ANSWER;
						notifyListeners();
					}, 
					10000
				))
			.build()
			.execute();
	}
	
	private void incrementScore(String playerName) {
		Long score = playerNamesToScores.get(playerName);
		playerNamesToScores.put(playerName, score + 1);
	}
	
	private void notifyListeners() {
		listeners.forEach(listener -> listener.onUpdate(this));
	}
	
	public static class Builder {
		
		private String roomName;
		private List<GameListener> listeners;
		
		public Builder() {
			listeners = new ArrayList<GameListener>();
		}
		
		public Builder setRoomName(String roomName) {
			this.roomName = roomName; return this;
		}
		
		public Builder addListener(GameListener listener) {
			listeners.add(listener); return this;
		}
		
		public Builder setListeners(List<GameListener> listeners) {
			this.listeners = listeners; return this;
		}
		
		public Game build() {
			return new Game(roomName, listeners);
		}
		
	}
	
}
