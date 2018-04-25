package org.l2k.trivia2.controller;

import org.l2k.trivia2.domain.Session;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SessionController {
	
	private SessionService sessionService;

	public SessionController(SessionService sessionService) {
		this.sessionService = sessionService;
	}

	public ResponseEntity<Session> registerSession(Session session) {
		Session registeredSession = sessionService.registerSession(session);
		
		ResponseEntity<Session> sessionResponse;
		if (registeredSession != null) {
			sessionResponse = new ResponseEntity<Session>(registeredSession, HttpStatus.OK);
		} else {
			sessionResponse = new ResponseEntity<Session>((Session)null, HttpStatus.FORBIDDEN);						
		}
		
		return sessionResponse;
	}

}
