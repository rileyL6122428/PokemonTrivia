package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.function.Predicate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.P2PSession;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class P2PSessionRepositoryTest {

	private P2PSessionRepository sessionRepository;
	
	@Mock private SessionExpirationArbiter expirationArbiter;
	@Mock private NameRepository nameRepository;
	@Mock private SessionTable sessionTable;
	
	@BeforeEach
	void setup() {
		sessionRepository = new P2PSessionRepository(
			expirationArbiter,  
			sessionTable, 
			nameRepository
		);
	}
	
	@Nested
	class CreateSession {
		
		private P2PSession session;
		
		@BeforeEach
		public void setup() {
			session = new P2PSession.Builder()
				.setId("EXAMPLE_ID")
				.setLastUpdated(new Date())
				.build();
		}
				
		@Test
		void clearsUnSyncedSessions() {
			ArgumentCaptor<Predicate<P2PSession>> clearRecordsPredicateCaptor = ArgumentCaptor.forClass(Predicate.class);
			when(sessionTable.clearRecords(clearRecordsPredicateCaptor.capture())).thenReturn(new ArrayList<>());
			
			sessionRepository.createSession(session);
			
			Predicate<P2PSession> clearRecordsPredicate = clearRecordsPredicateCaptor.getValue(); 
			P2PSession verifyPredicateSession = new P2PSession.Builder().build();
			clearRecordsPredicate.test(verifyPredicateSession);
			verify(expirationArbiter, times(1)).isExpired(verifyPredicateSession);
		}
		
		@Test
		void putsClearedSessionNamesBackIntoNameRepository() {
			when(sessionTable.clearRecords(any(Predicate.class))).thenReturn(new ArrayList<P2PSession>() {{
				add(new P2PSession.Builder().setName("EXAMPLE_NAME_1").build());
				add(new P2PSession.Builder().setName("EXAMPLE_NAME_2").build());
			}});
			
			sessionRepository.createSession(session);
			
			verify(nameRepository).insertName("EXAMPLE_NAME_1");
			verify(nameRepository).insertName("EXAMPLE_NAME_2");
		}
		
		@Test
		void returnsNullIfNameRepositoryEmpty() {
			when(nameRepository.takeName()).thenReturn(null);
			P2PSession storedSession = sessionRepository.createSession(session);
			assertNull(storedSession);
		}
		
		@Nested
		class HappyPath {
			
			@BeforeEach
			public void setup() {
				when(nameRepository.takeName()).thenReturn("EXAMPLE_NAME");
			}
			
			@Test
			void returnsSessionUpdatedWithNameFromNameRepository() {
				P2PSession returnedSession = sessionRepository.createSession(session);
				assertEquals("EXAMPLE_NAME", returnedSession.getName());
			}
			
			@Test
			void returnsSessionUpdatedWithStatusOfReadyToSync() {
				P2PSession returnedSession = sessionRepository.createSession(session);
				assertEquals(SessionStatus.READY_TO_SYNC, returnedSession.getStatus());
			}
			
			@Test
			void returnsSessionWithValuesMatchingTheSubmittedSession() {
				P2PSession returnedSession = sessionRepository.createSession(session);
				assertEquals(session.getLastUpdated(), returnedSession.getLastUpdated());
				assertEquals("EXAMPLE_ID", returnedSession.getId());
			}
			
			@Test
			void storesSession() {
				P2PSession returnedSession = sessionRepository.createSession(session);
				verify(sessionTable, times(1)).saveRecord(returnedSession);
			}
		}
	}
}
