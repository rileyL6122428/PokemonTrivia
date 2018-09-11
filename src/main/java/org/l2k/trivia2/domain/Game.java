package org.l2k.trivia2.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
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
		REVEALING_ANSWER("REVEALING_ANSWER"),
		READY_FOR_NEXT_QUESTION("READY_FOR_NEXT_QUESTION");
	 
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
	private LinkedList<Question> questions;
	
	public Game(String roomName, List<GameListener> listeners) {
		this.roomName = roomName;
		this.phase = Phase.NOT_STARTED;
		this.playerNamesToScores = new HashMap<String, Long>();
		this.listeners = listeners;
		this.questions = new LinkedList<Question>() {{
			add(new Question.Builder()
				.setDescription("Which of the following pokemon is a grass type?")
				.setCorrectAnswer(PokemonConstants.BULBASAUR)
				.addIncorrectAnswer(PokemonConstants.CHARMANDER)
				.addIncorrectAnswer(PokemonConstants.SQUIRTLE)
			.build());
			
			add(new Question.Builder()
				.setDescription("Which of the following pokemon is a fire type?")
				.setCorrectAnswer(PokemonConstants.CHARMANDER)
				.addIncorrectAnswer(PokemonConstants.BULBASAUR)
				.addIncorrectAnswer(PokemonConstants.SQUIRTLE)
			.build());
			
			add(new Question.Builder()
				.setDescription("Which of the following pokemon is a water type?")
				.setCorrectAnswer(PokemonConstants.SQUIRTLE)
				.addIncorrectAnswer(PokemonConstants.BULBASAUR)
				.addIncorrectAnswer(PokemonConstants.CHARMANDER)
			.build());
			
			add(new Question.Builder()
				.setDescription("Which of the following pokemon has an evolution at level 32?")
				.setCorrectAnswer(PokemonConstants.BULBASAUR)
				.addIncorrectAnswer(PokemonConstants.CHARMANDER)
				.addIncorrectAnswer(PokemonConstants.SQUIRTLE)
			.build());
			
			add(new Question.Builder()
				.setDescription("In Gen 1, which of the following pokemon learns the attack, 'Bite'?")
				.setCorrectAnswer(PokemonConstants.SQUIRTLE)
				.addIncorrectAnswer(PokemonConstants.CHARMANDER)
				.addIncorrectAnswer(PokemonConstants.BULBASAUR)
			.build());
			
			add(new Question.Builder()
				.setDescription("In Gen 1, which of the following pokemon cannot learn the attack, 'Swords Dance'?")
				.setCorrectAnswer(PokemonConstants.SQUIRTLE)
				.addIncorrectAnswer(PokemonConstants.CHARMANDER)
				.addIncorrectAnswer(PokemonConstants.BULBASAUR)
			.build());
		}};
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
			scheduleGame();
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
	
	private void scheduleGame() {
		new SequenceBuilder()
			.setInitialDelay(2000)
			.addEvent(new DelayedEvent(this::startGame, 3000))
			.addEvent(new DelayedEvent(this::askQuestion, 8000))
			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
			
			.addEvent(new DelayedEvent(this::announceIncomingQuestion, 2500))
			.addEvent(new DelayedEvent(this::askQuestion, 8000))
			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
			
			.addEvent(new DelayedEvent(this::announceIncomingQuestion, 2500))
			.addEvent(new DelayedEvent(this::askQuestion, 8000))
			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
			
			.addEvent(new DelayedEvent(this::announceIncomingQuestion, 2500))
			.addEvent(new DelayedEvent(this::askQuestion, 8000))
			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
			
			.addEvent(new DelayedEvent(this::announceIncomingQuestion, 2500))
			.addEvent(new DelayedEvent(this::askQuestion, 8000))
			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
			
			.addEvent(new DelayedEvent(this::announceIncomingQuestion, 2500))
			.addEvent(new DelayedEvent(this::askQuestion, 8000))
			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
		.build()
		.execute();
	}
	
	private void startGame() {
		phase = Phase.STARTED;
		notifyListeners();
	}
	
	private void askQuestion() {
		currentQuestion = questions.removeFirst();
		phase = Phase.ASKING_QUESTION;
		notifyListeners();
	}
	
	private void revealAnswer() {
		currentQuestion
			.playersWithCorrectAnswers()
			.forEach(this::incrementScore);
	
		phase = Phase.REVEALING_ANSWER;
		notifyListeners();
	}
	
	private void announceIncomingQuestion() {
		phase = Phase.READY_FOR_NEXT_QUESTION;
		notifyListeners();
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
