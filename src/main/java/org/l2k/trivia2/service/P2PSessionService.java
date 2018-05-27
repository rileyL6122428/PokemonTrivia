package org.l2k.trivia2.service;

import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.SessionStatus;
import org.l2k.trivia2.repository.NameRepository;
import org.l2k.trivia2.repository.P2PSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class P2PSessionService {

	private SessionExpirationArbiter expirationArbiter;
	private NameRepository nameRepository;
	private P2PSessionRepository sessionRepository;
	private DateService dateService;

	@Autowired
	public P2PSessionService(
		SessionExpirationArbiter expirationArbiter, 
		P2PSessionRepository sessionRepository, 
		NameRepository nameRepository, 
		DateService dateService
	) {
		this.expirationArbiter = expirationArbiter;
		this.nameRepository = nameRepository;
		this.sessionRepository = sessionRepository;
		this.dateService = dateService;
	}

	public P2PSession postSession(String sessionId) {
		clearExpiredSessions();
		String userName = getUserNameFor(sessionId);
		if (userName != null) {
			P2PSession session = buildPostableSession(sessionId, userName);
			sessionRepository.saveRecord(session);
			return session;
		} else {
			return null;
		}
	}

	private String getUserNameFor(String sessionId) {
		String userName;
		if (sessionRepository.contains(sessionId)) {
			userName = sessionRepository.get(sessionId).getName();
		} else {
			userName = nameRepository.takeName();
		}
		return userName;
	}

	private void clearExpiredSessions() {
		sessionRepository.clearRecords(expirationArbiter::isExpired)
		.forEach((removedSession) -> nameRepository.insertName(removedSession.getName()));
	}
	
	private P2PSession buildPostableSession(String id, String name) {
		return new P2PSession.Builder()
			.setName(name)
			.setId(id)
			.setLastUpdated(dateService.getCurrentDate())
			.setSessionStatus(SessionStatus.READY_TO_SYNC)
			.build();
	}

	public P2PSession syncSession(String sessionId) {
		P2PSession session = sessionRepository.get(sessionId);
		
		if (session != null) {
			P2PSession syncedSession = sync(session);
			sessionRepository.saveRecord(syncedSession);
			return syncedSession;
		} else {
			return null;
		}
	}
	
	private P2PSession sync(P2PSession session) {
		return new P2PSession.Builder(session)
				.setLastUpdated(dateService.getCurrentDate())
				.setSessionStatus(SessionStatus.SYNCED)
				.build();
	}

}
