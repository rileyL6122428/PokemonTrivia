package org.l2k.trivia2.repository;

import org.l2k.trivia2.domain.P2PSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class P2PSessionRepository {

	private SessionExpirationArbiter expirationArbiter;
	private NameRepository nameRepository;
	private SessionTable sessionTable;

	@Autowired
	public P2PSessionRepository(SessionExpirationArbiter expirationArbiter, SessionTable sessionTable, NameRepository nameRepository) {
		this.expirationArbiter = expirationArbiter;
		this.nameRepository = nameRepository;
		this.sessionTable = sessionTable;
	}

	public P2PSession postSession(P2PSession session) {
		sessionTable.clearRecords(expirationArbiter::isExpired)
		.forEach((removedSession) -> nameRepository.insertName(removedSession.getName()));
		String userName = nameRepository.takeName();
		return userName != null ? postSession(session, userName) : null;
	}
	
	private P2PSession postSession(P2PSession session, String userName) {
		P2PSession postedSession = new P2PSession.Builder(session)
			.setName(userName)
			.setSessionStatus(SessionStatus.READY_TO_SYNC)
			.build();
		
		sessionTable.saveRecord(postedSession);
		return postedSession;
	}

}
