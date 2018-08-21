package org.l2k.trivia2.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Game {
	
	enum Phase {
		NOT_STARTED("NOT_STARTED"),
		STARTED("STARTED");
	 
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
	
	private void startGame() {
		phase = Phase.STARTED;
		notifyListeners();
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
