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

class P2PSessionTableTest {

	private P2PSessionTable sessionTable;
	private P2PSession session1;
	private P2PSession session2;
	private P2PSession session3;
	
	@BeforeEach
	void setup() {
		sessionTable = new P2PSessionTable(new HashMap<String, P2PSession>());
		
		session1 = new P2PSession.Builder().setId("EXAMPLE_ID_1").build();
		session2 = new P2PSession.Builder().setId("EXAMPLE_ID_2").build();
		session3 = new P2PSession.Builder().setId("EXAMPLE_ID_3").build();
	}
	
	@Nested
	class SaveRecord {
		
		@Test
		void persistsSession() {
			sessionTable.saveRecord(session1);
			sessionTable.saveRecord(session2);
			
			assertTrue(sessionTable.contains(session1));
			assertTrue(sessionTable.contains(session2));
			assertFalse(sessionTable.contains(session3));
		}
		
	}
	
	@Nested
	class ClearRecords {
		
		@BeforeEach
		public void setup() {
			sessionTable.saveRecord(session1);
			sessionTable.saveRecord(session2);
			sessionTable.saveRecord(session3);			
		}
		
		@Test
		void removesSessionsThatEvaluateToTrueForTheProvidedPredicate() {
			sessionTable.clearRecords((session) -> session.getId().equals("EXAMPLE_ID_1"));
			
			assertFalse(sessionTable.contains(session1));
			assertTrue(sessionTable.contains(session2));
			assertTrue(sessionTable.contains(session3));
		}
		
		@Test
		void returnsListOfRemovedSessions() {
			List<P2PSession> removedSessions = sessionTable.clearRecords((session) -> session.getId().equals("EXAMPLE_ID_1"));
			assertEquals(1, removedSessions.size());
			assertTrue(removedSessions.contains(session1));
		}
		
	}

}
