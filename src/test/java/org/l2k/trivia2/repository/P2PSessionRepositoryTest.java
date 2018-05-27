package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashMap;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.l2k.trivia2.domain.P2PSession;

class P2PSessionRepositoryTest {

	private P2PSessionRepository sessionRepository;
	private P2PSession session1;
	private P2PSession session2;
	private P2PSession session3;
	
	@BeforeEach
	void setup() {
		sessionRepository = new P2PSessionRepository(new HashMap<String, P2PSession>());
		
		session1 = new P2PSession.Builder().setId("EXAMPLE_ID_1").build();
		session2 = new P2PSession.Builder().setId("EXAMPLE_ID_2").build();
		session3 = new P2PSession.Builder().setId("EXAMPLE_ID_3").build();
	}
	
	@Nested
	class SaveRecord {
		
		@Test
		void persistsSession() {
			sessionRepository.saveRecord(session1);
			sessionRepository.saveRecord(session2);
			
			assertTrue(sessionRepository.contains(session1));
			assertTrue(sessionRepository.contains(session2));
			assertFalse(sessionRepository.contains(session3));
		}
		
	}
	
	@Nested
	class ClearRecords {
		
		@BeforeEach
		public void setup() {
			sessionRepository.saveRecord(session1);
			sessionRepository.saveRecord(session2);
			sessionRepository.saveRecord(session3);			
		}
		
		@Test
		void removesSessionsThatEvaluateToTrueForTheProvidedPredicate() {
			sessionRepository.clearRecords((session) -> session.getId().equals("EXAMPLE_ID_1"));
			
			assertFalse(sessionRepository.contains(session1));
			assertTrue(sessionRepository.contains(session2));
			assertTrue(sessionRepository.contains(session3));
		}
		
		@Test
		void returnsListOfRemovedSessions() {
			List<P2PSession> removedSessions = sessionRepository.clearRecords((session) -> session.getId().equals("EXAMPLE_ID_1"));
			assertEquals(1, removedSessions.size());
			assertTrue(removedSessions.contains(session1));
		}
		
	}

}
