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
import org.l2k.trivia2.controller.SessionService;
import org.l2k.trivia2.domain.Session;
import org.l2k.trivia2.repository.P2PSessionRepository;
import org.mockito.InOrder;
import org.mockito.Mock;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class SessionServiceTest {
	
	private SessionService sessionService;
	
	@Mock private DateService dateService;
	@Mock private P2PSessionRepository sessionRepository;
	@Mock private Session session;
	
	@BeforeEach
	void setup() {
		sessionService = new SessionService(sessionRepository, dateService);
	}
	
	@Nested
	class RegisterSession {
		
		private Date date;
		
		@BeforeEach
		public void setup() {
			date = new Date();
			when(dateService.getCurrentDate()).thenReturn(date);			
		}
		
		@Test
		void appendsCurrentTimeToSession() {
			sessionService.registerSession(session);
			verify(session).setRegistrationDate(date);
		}
		
		@Test
		void delegatesSessionCreationToSessionRepository() {
			sessionService.registerSession(session);
			verify(sessionRepository).createSession(session);
		}
		
		@Test
		void addsDateToSessionPriorToRegistration() {
			InOrder inOrder = inOrder(session, sessionRepository);
			sessionService.registerSession(session);
			inOrder.verify(session, times(1)).setRegistrationDate(any(Date.class));
			inOrder.verify(sessionRepository, times(1)).createSession(session);
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
