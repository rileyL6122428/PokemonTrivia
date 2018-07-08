package org.l2k.trivia2.domain;

public class Room {
	
	private String mascotName;
	
	private Room(String mascotName) {
		this.mascotName = mascotName;
	}

	public String getMascotName() {
		return mascotName;
	}
	
	static public class Builder {
		private Pokemon mascot;
		
		public Builder setMascot(Pokemon mascot) {
			this.mascot = mascot; return this;
		}
		
		private String getMascotName() {
			return mascot != null ? mascot.getName() : null;
		}
		
		public Room build() {
			return new Room(getMascotName());
		}
	}

	public boolean hasVacancies() {
		// TODO Auto-generated method stub
		return false;
	}

	public void addUser(P2PSession user) {
		// TODO Auto-generated method stub
		
	}

}