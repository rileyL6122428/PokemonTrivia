package org.l2k.trivia2.repository;

import java.util.HashSet;
import java.util.Set;
import java.util.function.BooleanSupplier;
import java.util.stream.Collectors;

import org.l2k.trivia2.domain.Session;

public class P2PSessionRepository {

	private SessionExpirationArbiter expirationArbiter;
	private NameRepository nameRepository;
	private Set<Session> activeSessions;

	public P2PSessionRepository(SessionExpirationArbiter expirationArbiter, NameRepository nameRepository, Set<Session> activeSessions) {
		this.expirationArbiter = expirationArbiter;
		this.nameRepository = nameRepository;
		this.activeSessions = activeSessions;
	}

	public Session createSession(Session session) {
		removeExpiredSessions();
		String userName = nameRepository.takeName();
		return createSession(session, userName);
	}

	private void removeExpiredSessions() {
		activeSessions = activeSessions.stream()
			.filter((activeSession) -> !expirationArbiter.isExpired(activeSession))
			.collect(Collectors.toCollection(HashSet::new));
	}
	
	private Session createSession(Session session, String userName) {
		if(userName != null) {
			session.setName(userName);
			session.setStatus(SessionStatus.READY_TO_SYNC);
			activeSessions.add(session);
			return session;
		} else {
			return null;	
		}
	}

	public boolean contains(Session session) {
		return activeSessions.contains(session);
	}

	public Session syncSession(Session session) {
		if(activeSessions.contains(session)) {
			session.setStatus(SessionStatus.SYNCED);
			activeSessions.add(session);
			return session;
		} else {
			return null;			
		}
	}

}
