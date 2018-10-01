package org.l2k.trivia2.domain.game;

public enum Phase {
	
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
