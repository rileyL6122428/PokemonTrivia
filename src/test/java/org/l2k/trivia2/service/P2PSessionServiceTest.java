package org.l2k.trivia2.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.repository.P2PSessionRepository;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class P2PSessionServiceTest {
	
	public static final String EXAMPLE_HTTP_SESSION_ID = "EXAMPLE_HTTP_SESSION_ID";
	
	private P2PSessionService sessionService;
	
	@Mock private P2PSessionRepository sessionRepository;
	@Mock private P2PSession p2pSession;
	
	@BeforeEach
	void setup() {
		sessionService = new P2PSessionService(sessionRepository);
	}
	
	@Nested
	class RegisterHttpSession {
		
		@Nested
		class WrappedSession {
			
			private ArgumentCaptor<P2PSession> p2pSessionCaptor;

			@BeforeEach
			void setup() {
				p2pSessionCaptor = ArgumentCaptor.forClass(P2PSession.class);
				when(sessionRepository.postSession(p2pSessionCaptor.capture())).thenReturn(p2pSession);				
			}
			
			@Test
			void wrapsHttpSessionIdInP2PSessionAndDelegatesCreationToSessionRepository() {
				sessionService.registerHttpSession(EXAMPLE_HTTP_SESSION_ID);
				
				P2PSession submittedSession = p2pSessionCaptor.getValue();
				assertEquals(EXAMPLE_HTTP_SESSION_ID, submittedSession.getId());
			}
		}
		
		
		@Test
		void returnsNullWhenSessionRepositoryReturnsNull() {
			when(sessionRepository.postSession(any(P2PSession.class))).thenReturn(null);
			assertNull(sessionService.registerHttpSession(EXAMPLE_HTTP_SESSION_ID));
		}
		
		@Test
		void returnsSessionCreatedBySessionRepository() {
			when(sessionRepository.postSession(any(P2PSession.class))).thenReturn(p2pSession);
			assertEquals(p2pSession, sessionService.registerHttpSession(EXAMPLE_HTTP_SESSION_ID));
		}
	}

}
