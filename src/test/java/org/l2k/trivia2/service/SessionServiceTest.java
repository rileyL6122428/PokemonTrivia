package org.l2k.trivia2.service;

import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.verify;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Session;
import org.l2k.trivia2.repository.P2PSessionRepository;
import org.mockito.InOrder;
import org.mockito.Mock;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class SessionServiceTest {
	
	private SessionService sessionService;
	
	@Mock private P2PSessionRepository sessionRepository;
	@Mock private Session session;
	
	@BeforeEach
	void setup() {
		sessionService = new SessionService(sessionRepository);
	}
	
	@Nested
	class RegisterSession {
		
		@Test
		void delegatesSessionCreationToSessionRepository() {
			sessionService.registerSession(session);
			verify(sessionRepository).createSession(session);
		}
		
		@Test
		void returnsNullWhenSessionRepositoryReturnsNull() {
			when(sessionRepository.createSession(session)).thenReturn(null);
			assertNull(sessionService.registerSession(session));
		}
		
		@Test
		void returnsASessionWhenTheSessionRepositoryReturnsASession() {
			when(sessionRepository.createSession(session)).thenReturn(session);
			assertEquals(session, sessionService.registerSession(session));
		}
	}

}
