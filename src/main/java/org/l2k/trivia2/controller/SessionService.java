package org.l2k.trivia2.controller;

import org.l2k.trivia2.domain.Session;
import org.l2k.trivia2.repository.P2PSessionRepository;
import org.l2k.trivia2.service.DateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionService {

	private P2PSessionRepository sessionRepository;
	private DateService dateService;
	
	@Autowired
	public SessionService(P2PSessionRepository sessionRepository, DateService dateService) {
		this.sessionRepository = sessionRepository;
		this.dateService = dateService;
	}

	public Session registerSession(Session session) {
		session.setRegistrationDate(dateService.getCurrentDate());
		return sessionRepository.createSession(session);
	}

}
