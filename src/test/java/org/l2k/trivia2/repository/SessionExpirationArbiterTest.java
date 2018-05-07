package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Session;
import org.l2k.trivia2.service.DateService;
import org.mockito.Mock;
import static org.mockito.Mockito.*;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class SessionExpirationArbiterTest {

	private static final long SYNC_THRESHOLD = 20000;
	private static final Date BASELINE_DATE = new Date(0);
	private static final Date EXCEED_SYNC_THRESHOLD_DATE = new Date(SYNC_THRESHOLD + 1);
	
	private SessionExpirationArbiter expirationArbiter;
	@Mock private DateService dateService;
	
	@BeforeEach
	public void setup() {
		expirationArbiter = new SessionExpirationArbiter(SYNC_THRESHOLD, dateService);
	}
	
	@Nested
	class IsExpired {	
		
		@Test
		void returnsTrueWhenReadyToSyncAndDateOfLastUpdateIsLessThanCurrentDateMinusSyncThreshold() {
			Session session = new Session.Builder()
				.setSessionStatus(SessionStatus.READY_TO_SYNC)
				.setLastUpdated(BASELINE_DATE)
				.build();
			
			when(dateService.getCurrentDate()).thenReturn(EXCEED_SYNC_THRESHOLD_DATE);
			
			assertTrue(expirationArbiter.isExpired(session));
		}
		
		@Test
		void returnsFalseWhenNotReadyToSync() {
			Session session = new Session.Builder()
				.setSessionStatus(SessionStatus.SYNCED)
				.build();
			
			assertFalse(expirationArbiter.isExpired(session));
		}
	}

}
