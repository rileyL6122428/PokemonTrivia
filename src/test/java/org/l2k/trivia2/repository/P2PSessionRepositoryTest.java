package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.function.Predicate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Session;
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
		
		private Session session;
		
		@BeforeEach
		public void setup() {
			session = new Session.Builder()
				.setId("EXAMPLE_ID")
				.setLastUpdated(new Date())
				.build();
		}
				
		@Test
		void clearsUnSyncedSessions() {
			/*
			 * Indirectly tests that the predicate passed to the sessionTable.clearRecords
			 * call is expirationAribiter::isExpired. This indirect verification was 
			 * implemented because a direct equality check on lamdas does not work.
			 * */
			
			ArgumentCaptor<Predicate<Session>> clearRecordsPredicateCaptor = ArgumentCaptor.forClass(Predicate.class);
			doNothing().when(sessionTable).clearRecords(clearRecordsPredicateCaptor.capture());
			
			sessionRepository.createSession(session);
			
			Predicate<Session> clearRecordsPredicate = clearRecordsPredicateCaptor.getValue(); 
			Session verifyPredicateSession = new Session.Builder().build();
			clearRecordsPredicate.test(verifyPredicateSession);
			verify(expirationArbiter, times(1)).isExpired(verifyPredicateSession);
		}
		
		@Test
		void returnsNullIfNameRepositoryEmpty() {
			when(nameRepository.takeName()).thenReturn(null);
			Session storedSession = sessionRepository.createSession(session);
			assertNull(storedSession);
		}
		
		@Nested
		class HappyPath {
			
			@BeforeEach
			public void setup() {
				when(nameRepository.takeName()).thenReturn("EXAMPLE_NAME");
			}
			
			@Test
			void returnsSessionUpdatedWithNameProvidedByNameRepositoryAndStatusOfReadyToSync() {
				Session returnedSession = sessionRepository.createSession(session);
				assertEquals("EXAMPLE_ID", returnedSession.getId());
				assertEquals(session.getLastUpdated(), returnedSession.getLastUpdated());
				assertEquals("EXAMPLE_NAME", returnedSession.getName());
				assertEquals(SessionStatus.READY_TO_SYNC, returnedSession.getStatus());
			}
			
			@Test
			void storesSession() {
				Session returnedSession = sessionRepository.createSession(session);
				verify(sessionTable, times(1)).saveRecord(returnedSession);
			}
		}
	}
}
