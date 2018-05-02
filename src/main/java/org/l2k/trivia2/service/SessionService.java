package org.l2k.trivia2.service;

import org.l2k.trivia2.domain.Session;
import org.l2k.trivia2.repository.P2PSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

	private P2PSessionRepository sessionRepository;
	
	@Autowired
	public SessionService(P2PSessionRepository sessionRepository) {
		this.sessionRepository = sessionRepository;
	}

	public Session registerSession(Session session) {
		return sessionRepository.createSession(session);
	}

}
