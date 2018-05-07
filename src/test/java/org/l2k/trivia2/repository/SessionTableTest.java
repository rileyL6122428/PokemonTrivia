package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashMap;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.l2k.trivia2.domain.Session;

class SessionTableTest {

	@Nested
	class SaveRecord {
		
		private SessionTable sessionTable;
		
		@BeforeEach
		void setup() {
			sessionTable = new SessionTable(new HashMap<String, Session>());			
		}

		@Test
		void persistsSession() {
			Session session1 = new Session.Builder().setId("EXAMPLE_ID_1").build();
			Session session2 = new Session.Builder().setId("EXAMPLE_ID_2").build();
			Session session3 = new Session.Builder().setId("EXAMPLE_ID_3").build();
			
			sessionTable.saveRecord(session1);
			sessionTable.saveRecord(session2);
			
			assertTrue(sessionTable.contains(session1));
			assertTrue(sessionTable.contains(session2));
			assertFalse(sessionTable.contains(session3));
		}
		
	}

}
