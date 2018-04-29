package org.l2k.trivia2.repository;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.l2k.trivia2.domain.Session;

public class P2PSessionRepository {

	private SessionExpirationArbiter expirationArbiter;
	private Set<Session> activeSessions;

	public P2PSessionRepository(SessionExpirationArbiter expirationArbiter, Set<Session> activeSessions) {
		this.expirationArbiter = expirationArbiter;
		this.activeSessions = activeSessions;
	}

	public Session createSession(Session session) {
		activeSessions = activeSessions.stream()
			.filter((activeSession) -> !expirationArbiter.isExpired(activeSession))
			.collect(Collectors.toCollection(HashSet::new));
		return null;
	}

	public Set<Session> getActiveSessions() {
		return activeSessions
				.stream()
				.collect(Collectors.toCollection(HashSet::new));
	}

}
