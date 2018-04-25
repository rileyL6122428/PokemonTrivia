package org.l2k.trivia2.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Session;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class SessionControllerTest {
	
	@Mock
	private SessionService sessionService;
	
	@Mock
	private Session session;
	
	private SessionController sessionController;
	
	@BeforeEach
	void setup() {
		sessionController = new SessionController(sessionService);
	}
	
	@Test
	void delegatesSessionManagementToSessionService() {
		sessionController.registerSession(session);
		verify(sessionService).registerSession(session);
	}
	
	
	@Test
	void returns403WhenSessionServiceCantRegisterASession() {
		when(sessionService.registerSession(any(Session.class))).thenReturn(null);
		ResponseEntity<Session> response = sessionController.registerSession(session);
		assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
	}

}
