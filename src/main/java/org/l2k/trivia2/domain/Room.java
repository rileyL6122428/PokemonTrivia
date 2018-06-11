package org.l2k.trivia2.domain;

public class Room {
	
	private String name;
	
	private Room(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
	
	static public class Builder {
		private String name;
		
		public Builder setName(String name) {
			this.name = name; return this;
		}
		
		public Room build() {
			return new Room(name);
		}
	}

}
