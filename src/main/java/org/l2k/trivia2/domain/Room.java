package org.l2k.trivia2.domain;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

public class Room {
	
	private String mascotName;
	private Map<String, P2PSession> users;
	
	private Room(String mascotName, Map<String, P2PSession> users) {
		this.mascotName = mascotName;
		this.users = users;
	}

	public String getMascotName() {
		return mascotName;
	}
	
	public boolean hasVacancies() {
		return users.size() < 6;
	}
	
	public void addUser(P2PSession user) {
		if (hasVacancies()) {
			users.put(user.getName(), user);
		}
	}
	
	private Map<String, P2PSession> getUsers() {
		return users;
	}
	
	public boolean equals(Object object) {
		if (object != null && object instanceof Room) {
			Room room = (Room) object;
			return StringUtils.equals(room.getMascotName(), this.getMascotName()); 
		} else {
			return false;
		}
	}
	
	static public class Builder {
		
		private Pokemon mascot;
		private Map<String, P2PSession> users;
		private Room room;
		
		public Builder() { }
		
		public Builder(Room room) {
			this.room = room;
		}
		
		public Builder setMascot(Pokemon mascot) {
			this.mascot = mascot; return this;
		}
		
		public Builder setUsers(Map<String, P2PSession> users) {
			this.users = users; return this; 
		}
		
		private String getMascotName() {
			String mascotName = null;
			if (room != null) { 
				mascotName = room.getMascotName(); 
			}
			if (mascot != null) { 
				mascotName = mascot.getName(); 
			}
			return mascotName;
		}
		
		private Map<String, P2PSession> getUsers() {
			Map<String, P2PSession> users = null;
			if (this.users != null) { 
				users = this.users; 
			}
			if (room != null && room.getUsers() != null) { 
				users = room.getUsers(); 
			}
			return users;
		}
		
		public Room build() {
			return new Room(getMascotName(), getUsers());
		}
	}
}