package org.l2k.trivia2.domain;

import java.util.HashMap;
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
	private Map<String, Player> playerNamesToPlayers;
	private String roomName;
	
	public Game(String roomName) {
		this.roomName = roomName;
		this.phase = Phase.NOT_STARTED;
		this.playerNamesToPlayers = new HashMap<String, Player>();
	}

	public Map<String, Player> getPlayerNamesToPlayers() {
		return playerNamesToPlayers;
	}
	
	public Phase getPhase() {
		return phase;
	}
	
	public String getRoomName() {
		return roomName;
	}
	
}
