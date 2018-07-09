package org.l2k.trivia2.domain;

public class Room {
	
	private String mascotName;
	
	private Room(String mascotName) {
		this.mascotName = mascotName;
	}

	public String getMascotName() {
		return mascotName;
	}
	
	public boolean hasVacancies() {
		// TODO Auto-generated method stub
		return false;
	}
	
	public void addUser(P2PSession user) {
		// TODO Auto-generated method stub
		
	}
	
	public boolean equals(Object object) {
		if (object != null && object instanceof Room) {
			Room room = (Room) object;
			return room.getMascotName().equals(getMascotName()); 
		} else {
			return false;
		}
	}
	
	static public class Builder {
		
		private Pokemon mascot;
		private Room room;
		
		public Builder() { }
		
		public Builder(Room room) {
			this.room = room;
		}
		
		public Builder setMascot(Pokemon mascot) {
			this.mascot = mascot; return this;
		}
		
		private String getMascotName() {
			String mascotName = null;
			if (room != null) { mascotName = room.getMascotName(); }
			if (mascot != null) { mascotName = mascot.getName(); }
			return mascotName;
		}
		
		public Room build() {
			return new Room(getMascotName());
		}
	}
}