package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
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
import org.l2k.trivia2.service.DateService;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class P2PSessionRepositoryTest {

	private P2PSessionRepository sessionRepository;
	
	@Mock private SessionExpirationArbiter expirationArbiter;
	@Mock private NameRepository nameRepository;
	@Mock private P2PSessionTable sessionTable;
	@Mock private DateService dateService;
	
	@BeforeEach
	void setup() {
		sessionRepository = new P2PSessionRepository(
			expirationArbiter,  
			sessionTable, 
			nameRepository,
			dateService
		);
	}
	
	@Nested
	class PostSession {
		
		private P2PSession session;
		
		@BeforeEach
		public void setup() {
			session = new P2PSession.Builder()
				.setId("EXAMPLE_ID")
				.build();
		}
				
		@Test
		void clearsUnSyncedSessions() {
			ArgumentCaptor<Predicate<P2PSession>> clearRecordsPredicateCaptor = ArgumentCaptor.forClass(Predicate.class);
			when(sessionTable.clearRecords(clearRecordsPredicateCaptor.capture())).thenReturn(new ArrayList<>());
			
			sessionRepository.postSession(session);
			
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
			
			sessionRepository.postSession(session);
			
			verify(nameRepository).insertName("EXAMPLE_NAME_1");
			verify(nameRepository).insertName("EXAMPLE_NAME_2");
		}
		
		@Test
		void returnsNullIfNameRepositoryEmpty() {
			when(nameRepository.takeName()).thenReturn(null);
			P2PSession storedSession = sessionRepository.postSession(session);
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
				P2PSession returnedSession = sessionRepository.postSession(session);
				assertEquals("EXAMPLE_NAME", returnedSession.getName());
			}
			
			@Test
			void returnsSessionUpdatedWithStatusOfReadyToSync() {
				P2PSession returnedSession = sessionRepository.postSession(session);
				assertEquals(SessionStatus.READY_TO_SYNC, returnedSession.getStatus());
			}
			
			@Test
			void returnsSessionWithLastUpdatedSetToCurrentDate() {
				Date currentDate = new Date();
				when(dateService.getCurrentDate()).thenReturn(currentDate);
				
				P2PSession returnedSession = sessionRepository.postSession(session);
				
				assertEquals(currentDate, returnedSession.getLastUpdated());
			}
			
			@Test
			void returnsSessionWithValuesMatchingTheSubmittedSession() {
				P2PSession returnedSession = sessionRepository.postSession(session);
				assertEquals("EXAMPLE_ID", returnedSession.getId());
			}
		
			@Test
			void storesSession() {
				P2PSession returnedSession = sessionRepository.postSession(session);
				verify(sessionTable, times(1)).saveRecord(returnedSession);
			}
			
			@Nested
			class SessionAlreadyExists {
				
				private P2PSession repeatedSession;

				@BeforeEach
				void setup() {
					P2PSession returnedSession = sessionRepository.postSession(session);
					repeatedSession = new P2PSession.Builder().setId(session.getId()).build();
					when(sessionTable.contains(repeatedSession)).thenReturn(true);
					when(sessionTable.get(repeatedSession.getId())).thenReturn(returnedSession);
					when(nameRepository.takeName()).thenReturn("DIFFERNT_EXAMPLE_NAME");					
				}
				
				@Test
				void savesSessionWithPreviouslyGivenNameIfTableAlreadyContainsSession() {
					P2PSession sessionReturnedAfterRepeat = sessionRepository.postSession(repeatedSession);
					assertEquals("EXAMPLE_NAME", sessionReturnedAfterRepeat.getName());
				}
			}
		}
	}
	
	@Nested
	class SyncSession {
		
		@Test
		void returnsNullWhenProvidedSessionIdNotInTable() {
			when(sessionTable.get(any(String.class))).thenReturn(null);
			assertNull(sessionRepository.syncSession("EXAMPLE_SESSION_ID"));
		}
		
		@Nested
		class HappyPath {
			
			private P2PSession syncableSession;
			
			@BeforeEach
			void setup() {
				syncableSession = new P2PSession.Builder()
					.setName("EXAMPLE_SESSION_ID")
					.setName("EXAMPLE_SESSION_NAME")
					.build();
				
				when(sessionTable.get(syncableSession.getId())).thenReturn(syncableSession);
			}
			
			@Test
			void returnsSyncedSessionWithAppropriateAttributes() {
				Date currentDate = new Date();
				when(dateService.getCurrentDate()).thenReturn(currentDate);
				
				P2PSession syncedSession = sessionRepository.syncSession(syncableSession.getId());
				
				assertEquals(syncableSession.getId(), syncedSession.getId());
				assertEquals(SessionStatus.SYNCED, syncedSession.getStatus());
				assertEquals(currentDate, syncedSession.getLastUpdated());
				assertEquals(syncableSession.getName(), syncedSession.getName());
			}
			
			@Test
			void copiesSyncedSessionIntoSessionTable() {
				P2PSession syncedSession = sessionRepository.syncSession(syncableSession.getId());
				verify(sessionTable, times(1)).saveRecord(syncedSession);
			}
			
		}
	}
}
