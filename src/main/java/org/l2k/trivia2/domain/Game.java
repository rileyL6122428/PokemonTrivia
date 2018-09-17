package org.l2k.trivia2.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.l2k.trivia2.scheduler.DelayedEvent;
import org.l2k.trivia2.scheduler.SequenceBuilder;
import org.l2k.trivia2.service.QuestionService;

public class Game {
	
	enum Phase {
		NOT_STARTED("NOT_STARTED"),
		STARTED("STARTED"),
		ASKING_QUESTION("ASKING_QUESTION"),
		REVEALING_ANSWER("REVEALING_ANSWER"),
		STAGING_NEXT_QUESTION("STAGING_NEXT_QUESTION"),
		ANNOUNCING_WINNERS("ANNOUNCING_WINNERS");
	 
	    private String stringRep;
	 
	    private Phase(String toString) {
	        this.stringRep = toString;
	    }
	    
	    public String getAsString() {
	    		return this.stringRep; 
	    }
	}
	
	private Phase phase;
	private Map<String, Integer> playerNamesToScores;
	private String roomName;
	private List<GameListener> listeners;
	private Question currentQuestion;
	private LinkedList<Question> questions;
	private QuestionService questionService;
	
	public Game(String roomName, List<GameListener> listeners, QuestionService questionService) {
		this.roomName = roomName;
		this.phase = Phase.NOT_STARTED;
		this.playerNamesToScores = new HashMap<String, Integer>();
		this.listeners = listeners;
		this.questionService = questionService;
		this.questions = questionService.getQuestions();
	}

	public Map<String, Integer> getPlayerNamesToScores() {
		return playerNamesToScores;
	}
	
	public Phase getPhase() {
		return phase;
	}
	
	public String getRoomName() {
		return roomName;
	}

	public void addUser(P2PSession p2PSession) {
		this.playerNamesToScores.put(p2PSession.getName(), 0);
		attemptGameStart();
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
			
//			.addEvent(new DelayedEvent(this::announceIncomingQuestion, 2500))
//			.addEvent(new DelayedEvent(this::askQuestion, 8000))
//			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
//			
//			.addEvent(new DelayedEvent(this::announceIncomingQuestion, 2500))
//			.addEvent(new DelayedEvent(this::askQuestion, 8000))
//			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
//			
//			.addEvent(new DelayedEvent(this::announceIncomingQuestion, 2500))
//			.addEvent(new DelayedEvent(this::askQuestion, 8000))
//			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
//			
//			.addEvent(new DelayedEvent(this::announceIncomingQuestion, 2500))
//			.addEvent(new DelayedEvent(this::askQuestion, 8000))
//			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
//			
//			.addEvent(new DelayedEvent(this::announceIncomingQuestion, 2500))
//			.addEvent(new DelayedEvent(this::askQuestion, 8000))
//			.addEvent(new DelayedEvent(this::revealAnswer, 6000))
			
			.addEvent(new DelayedEvent(this::announceWinners, 8000))
			
			.addEvent(new DelayedEvent(this::queueNextGame, 8000))
			
			.addEvent(new DelayedEvent(this::attemptGameStart, 8000))
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
		phase = Phase.STAGING_NEXT_QUESTION;
		notifyListeners();
	}
	
	private void incrementScore(String playerName) {
		int score = playerNamesToScores.get(playerName);
		playerNamesToScores.put(playerName, score + 1);
	}
	
	private void announceWinners() {
		phase = Phase.ANNOUNCING_WINNERS;
		notifyListeners();
	}
	
	private void queueNextGame() {
		phase = Phase.NOT_STARTED;
		resetScores();
		questions = questionService.getQuestions();
		notifyListeners();
	}
	
	private void resetScores() {
		for (String playerName : playerNamesToScores.keySet()) {
			playerNamesToScores.put(playerName, 0);
		}
	}
	
	private void attemptGameStart() {
		if (canStartGame()) {
			scheduleGame();
		}
	}
	
	private boolean canStartGame() {
		return playerTotal() > 1 && phase == Phase.NOT_STARTED;
	}
	
	private int playerTotal() {
		return playerNamesToScores.size();
	}
	
	private void notifyListeners() {
		listeners.forEach(listener -> listener.onUpdate(this));
	}
	
	public static class Builder {
		
		private String roomName;
		private List<GameListener> listeners;
		private QuestionService questionService;
		
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
		
		public Builder setQuestionService(QuestionService questionService) {
			this.questionService = questionService; return this;
		}
		
		public Game build() {
			return new Game(roomName, listeners, questionService);
		}
		
	}
	
}
