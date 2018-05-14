package org.l2k.trivia2.service;

import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.repository.P2PSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class P2PSessionService {

	private P2PSessionRepository sessionRepository;
	private DateService dateService;
	
	@Autowired
	public P2PSessionService(P2PSessionRepository sessionRepository, DateService dateService) {
		this.sessionRepository = sessionRepository;
		this.dateService = dateService;
	}

	public P2PSession registerHttpSession(String httpSessionId) {
		P2PSession p2pSession = new P2PSession.Builder()
				.setId(httpSessionId)
				.setLastUpdated(dateService.getCurrentDate())
				.build();
		return sessionRepository.postSession(p2pSession);
	}

}
