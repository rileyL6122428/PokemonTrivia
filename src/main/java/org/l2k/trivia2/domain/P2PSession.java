package org.l2k.trivia2.domain;

import java.util.Date;

public class P2PSession {

	private final String name;
	private final SessionStatus status;
	private final Date lastUpdated;
	private final String id;
	
	public P2PSession(String name, SessionStatus status, Date lastUpdated, String id) {
		this.name = name;
		this.status = status;
		this.lastUpdated = lastUpdated;
		this.id = id;
	}
	
	public Date getLastUpdated() {
		return lastUpdated;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}
	
	public SessionStatus getStatus() {
		return status;
	}
	
	
	public static class Builder {
		
		private String name;
		private SessionStatus status;
		private Date lastUpdated;
		private String id;
		
		public Builder() {}
		
		public Builder(P2PSession session) {
			this.name = session.name;
			this.status = session.status;
			this.lastUpdated = session.lastUpdated;
			this.id = session.id;
		}
		
		public Builder setName(String name) { 
			this.name = name; return this; 
		}
		
		public Builder setSessionStatus(SessionStatus status) {
			this.status = status; return this;
		}
		
		public Builder setLastUpdated(Date lastUpdated) {
			this.lastUpdated = lastUpdated; return this;
		}
		
		public Builder setId(String id) {
			this.id = id; return this;
		}
		
		public P2PSession build() {
			return new P2PSession(
				name,
				status,
				lastUpdated,
				id
			);
		}
	}
}
