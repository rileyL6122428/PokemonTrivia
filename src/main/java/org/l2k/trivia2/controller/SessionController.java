package org.l2k.trivia2.controller;

import static org.l2k.trivia2.constants.ControllerConstants.Paths;
import org.l2k.trivia2.domain.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class SessionController {
	
	private SessionService sessionService;

	@Autowired
	public SessionController(SessionService sessionService) {
		this.sessionService = sessionService;
	}

	@PostMapping(Paths.SESSION)
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
