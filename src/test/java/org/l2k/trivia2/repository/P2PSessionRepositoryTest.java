package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.when;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Session;
import org.mockito.Mock;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class P2PSessionRepositoryTest {

	private P2PSessionRepository sessionRepository;
	
	@Mock private SessionExpirationArbiter expirationArbiter;
	@Mock private Session preExistingSession1;
	@Mock private Session preExistingSession2;
	@Mock private NameRepository nameRepository;
	
	@BeforeEach
	void setup() {
		sessionRepository = new P2PSessionRepository(expirationArbiter, new HashSet<Session>() {{
			add(preExistingSession1);
			add(preExistingSession2);
		}});
	}
	
	@Nested
	class CreateSession {
		
		@Mock private Session newSession; 
		
		@Test
		void clearsUnSyncedSessions() {
			when(expirationArbiter.isExpired(preExistingSession1)).thenReturn(true);
			when(expirationArbiter.isExpired(preExistingSession2)).thenReturn(false);
			
			sessionRepository.createSession(newSession);
			
			Set<Session> activeSessions = sessionRepository.getActiveSessions();
			assertFalse(activeSessions.contains(preExistingSession1));
			assertTrue(activeSessions.contains(preExistingSession2));
		}
		
		@Test
		void returnsNullIfNameRepositoryEmpty() {
			when(nameRepository.takeName()).thenReturn(null);
			Session createdSession = sessionRepository.createSession(newSession);
			assertNull(createdSession);
		}
		
		@Disabled
		@Test
		void returnsSessionIfNameRepositoryHasVacantNames() {
			fail("Not yet implemented");
		}
		
		@Disabled
		@Test
		void storesSessionAsReadyToBeSynced() {
			fail("Not yet implemented");
		}
	}

	public P2PSessionRepository getSessionRepository() {
		return sessionRepository;
	}

	public void setSessionRepository(P2PSessionRepository sessionRepository) {
		this.sessionRepository = sessionRepository;
	}

}
