package org.l2k.trivia2.repository;

import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.service.DateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class P2PSessionRepository {

	private SessionExpirationArbiter expirationArbiter;
	private NameRepository nameRepository;
	private P2PSessionTable sessionTable;
	private DateService dateService;

	@Autowired
	public P2PSessionRepository(
		SessionExpirationArbiter expirationArbiter, 
		P2PSessionTable sessionTable, 
		NameRepository nameRepository, 
		DateService dateService
	) {
		this.expirationArbiter = expirationArbiter;
		this.nameRepository = nameRepository;
		this.sessionTable = sessionTable;
		this.dateService = dateService;
	}

	public P2PSession postSession(P2PSession session) {
		clearExpiredSessions();
		String userName = getUserNameFor(session);
		return userName != null ? postSession(session, userName) : null;
	}

	private String getUserNameFor(P2PSession session) {
		String userName;
		if (sessionTable.contains(session)) {
			userName = sessionTable.get(session.getId()).getName();
		} else {
			userName = nameRepository.takeName();
		}
		return userName;
	}

	private void clearExpiredSessions() {
		sessionTable.clearRecords(expirationArbiter::isExpired)
		.forEach((removedSession) -> nameRepository.insertName(removedSession.getName()));
	}
	
	private P2PSession postSession(P2PSession session, String userName) {
		P2PSession postedSession = new P2PSession.Builder(session)
			.setName(userName)
			.setLastUpdated(dateService.getCurrentDate())
			.setSessionStatus(SessionStatus.READY_TO_SYNC)
			.build();
		
		sessionTable.saveRecord(postedSession);
		return postedSession;
	}

	public P2PSession syncSession(String sessionId) {
		P2PSession session = sessionTable.get(sessionId);
		
		if (session != null) {
			P2PSession syncedSession = sync(session);
			sessionTable.saveRecord(syncedSession);
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
