package org.l2k.trivia2.repository;

import org.l2k.trivia2.domain.Session;

public class P2PSessionRepository {

	private SessionExpirationArbiter expirationArbiter;
	private NameRepository nameRepository;
	private SessionTable sessionTable;

	public P2PSessionRepository(SessionExpirationArbiter expirationArbiter, SessionTable sessionTable, NameRepository nameRepository) {
		this.expirationArbiter = expirationArbiter;
		this.nameRepository = nameRepository;
		this.sessionTable = sessionTable;
	}

	public Session createSession(Session session) {
		sessionTable.clearRecords(expirationArbiter::isExpired);
		String userName = nameRepository.takeName();
		return userName != null ? postSession(session, userName) : null;
	}
	
	private Session postSession(Session session, String userName) {
		Session postedSession = new Session.Builder(session)
			.setName(userName)
			.setSessionStatus(SessionStatus.READY_TO_SYNC)
			.build();
		
		sessionTable.saveRecord(postedSession);
		return postedSession;
	}

}
