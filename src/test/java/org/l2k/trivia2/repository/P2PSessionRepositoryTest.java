package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.HashSet;

import org.junit.jupiter.api.BeforeEach;
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
		sessionRepository = new P2PSessionRepository(expirationArbiter, nameRepository, new HashSet<Session>() {{
			add(preExistingSession1);
			add(preExistingSession2);
		}});
	}
	
	@Nested
	class CreateSession {
		
		private Session newSession;
		
		@BeforeEach
		public void setup() {
			newSession = new Session();
		}
		
		@Test
		void clearsUnSyncedSessions() {
			when(expirationArbiter.isExpired(preExistingSession1)).thenReturn(true);
			when(expirationArbiter.isExpired(preExistingSession2)).thenReturn(false);
			
			sessionRepository.createSession(newSession);
			
			assertFalse(sessionRepository.contains(preExistingSession1));
			assertTrue(sessionRepository.contains(preExistingSession2));
		}
		
		@Test
		void returnsNullIfNameRepositoryEmpty() {
			when(nameRepository.takeName()).thenReturn(null);
			Session storedSession = sessionRepository.createSession(newSession);
			assertNull(storedSession);
		}
		
		@Test
		void returnsSessionWithNameIfNameRepositoryHasVacantNames() {
			when(nameRepository.takeName()).thenReturn("EXAMPLE_NAME");
			
			Session storedSession = sessionRepository.createSession(newSession);
			
			assertNotNull(storedSession);
			assertEquals("EXAMPLE_NAME", storedSession.getName());
		}
		
		@Test
		void returnsSessionAsReadyToBeSyncedIfNameRepoHasVacantNames() {
			when(nameRepository.takeName()).thenReturn("EXAMPLE_NAME");
			
			Session storedSession = sessionRepository.createSession(newSession);
			
			assertNotNull(storedSession);
			assertEquals(SessionStatus.READY_TO_SYNC, storedSession.getStatus());
		}
	
		@Test
		void storesSessionIfNameRepoHasVacantNames() {
			when(nameRepository.takeName()).thenReturn("EXAMPLE_NAME");
			Session storedSession = sessionRepository.createSession(newSession);
			assertTrue(sessionRepository.contains(storedSession));
		}
	}

}
