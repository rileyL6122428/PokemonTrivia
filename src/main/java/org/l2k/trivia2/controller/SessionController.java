package org.l2k.trivia2.controller;

import static org.l2k.trivia2.constants.ControllerConstants.Paths;

import javax.servlet.http.HttpSession;

import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.service.P2PSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class SessionController {
	
	private P2PSessionService sessionService;

	@Autowired
	public SessionController(P2PSessionService sessionService) {
		this.sessionService = sessionService;
	}

	@PostMapping(Paths.SESSION)
	public ResponseEntity<P2PSession> registerSession(HttpSession httpSession) {
		P2PSession p2pSession = sessionService.registerHttpSession(httpSession.getId());
		
		ResponseEntity<P2PSession> sessionResponse;
		if (p2pSession != null) {
			sessionResponse = new ResponseEntity<P2PSession>(p2pSession, HttpStatus.OK);
		} else {
			sessionResponse = new ResponseEntity<P2PSession>((P2PSession)null, HttpStatus.FORBIDDEN);						
		}
		
		return sessionResponse;
	}

}
