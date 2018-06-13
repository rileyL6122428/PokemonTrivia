package org.l2k.trivia2.domain;

public class Room {
	
	private String mascotName;
	
	private Room(Pokemon mascot) {
		this.mascotName = mascot.getName();
	}

	public String getMascotName() {
		return mascotName;
	}
	
	static public class Builder {
		private Pokemon mascot;
		
		public Builder setMascot(Pokemon mascot) {
			this.mascot = mascot; return this;
		}
		
		public Room build() {
			return new Room(mascot);
		}
	}

}
