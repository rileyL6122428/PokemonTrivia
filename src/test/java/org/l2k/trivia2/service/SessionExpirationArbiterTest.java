package org.l2k.trivia2.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.SessionStatus;
import org.l2k.trivia2.service.DateService;
import org.l2k.trivia2.service.SessionExpirationArbiter;
import org.mockito.Mock;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class SessionExpirationArbiterTest {

	private static final long SYNC_THRESHOLD = 20000;
	private static final Date BASELINE = new Date(0);
	private static final Date AFTER_SYNC_THRESHOLD = new Date(SYNC_THRESHOLD + 1);
	
	private SessionExpirationArbiter expirationArbiter;
	@Mock private DateService dateService;
	
	@BeforeEach
	public void setup() {
		expirationArbiter = new SessionExpirationArbiter(SYNC_THRESHOLD, dateService);
	}
	
	@Nested
	class IsExpired {	
		
		@Test
		void returnsTrueWhenReadyToSyncAndDateOfLastUpdatePlusSyncThresholdIsLessThanCurrentDate() {
			P2PSession session = new P2PSession.Builder()
				.setSessionStatus(SessionStatus.READY_TO_SYNC)
				.setLastUpdated(BASELINE)
				.build();
			
			when(dateService.getCurrentDate()).thenReturn(AFTER_SYNC_THRESHOLD);
			
			assertTrue(expirationArbiter.isExpired(session));
		}
		
		@Test
		void returnsFalseWhenStatusIsNotReadyToSync() {
			P2PSession session = new P2PSession.Builder()
				.setSessionStatus(SessionStatus.SYNCED)
				.build();
			
			assertFalse(expirationArbiter.isExpired(session));
		}
		
		@Test
		void returnsFalseWhenReadyToSyncAndDateOfLastUpdatePlusSyncThresholdIsNotLessThanCurrentDate() {
			P2PSession session = new P2PSession.Builder()
				.setSessionStatus(SessionStatus.READY_TO_SYNC)
				.setLastUpdated(BASELINE)
				.build();
			
			when(dateService.getCurrentDate()).thenReturn(BASELINE);
			
			assertFalse(expirationArbiter.isExpired(session));
		}
	}

}
