package org.l2k.trivia2.domain;

import java.util.Date;

import org.l2k.trivia2.repository.SessionStatus;

public class Session {

	private String name;
	private SessionStatus status;

	public void setRegistrationDate(Date date) {
		// TODO Auto-generated method stub
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}

	public void setStatus(SessionStatus status) {
		this.status = status;
	}
	
	public SessionStatus getStatus() {
		return status;
	}
	
}
