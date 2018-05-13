package org.l2k.trivia2.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import javax.servlet.http.HttpSession;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.service.P2PSessionService;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class SessionControllerTest {
	
	private SessionController sessionController;
	
	@Mock private P2PSessionService sessionService;
	@Mock private HttpSession httpSession;
	@Mock private P2PSession p2pSession;
	
	@BeforeEach
	void setup() {
		sessionController = new SessionController(sessionService);
		when(httpSession.getId()).thenReturn("EXAMPLE_ID");
	}
	
	@Test
	void delegatesSessionManagementToSessionService() {
		sessionController.registerSession(httpSession);
		verify(sessionService).registerHttpSession("EXAMPLE_ID");
	}
	
	@Test
	void returns200WithP2PSessionWhenSessionServiceCanRegisterHttpSession() {
		when(sessionService.registerHttpSession(any(String.class))).thenReturn(p2pSession);
		ResponseEntity<P2PSession> response = sessionController.registerSession(httpSession);
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(p2pSession, response.getBody());
	}
	
	@Test
	void returns403WhenSessionServiceCantRegisterTheHttpSession() {
		when(sessionService.registerHttpSession(any(String.class))).thenReturn(null);
		ResponseEntity<P2PSession> response = sessionController.registerSession(httpSession);
		assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
	}

}
