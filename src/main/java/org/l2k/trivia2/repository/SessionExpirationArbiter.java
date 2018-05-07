package org.l2k.trivia2.repository;

import java.util.Date;

import org.l2k.trivia2.domain.Session;
import org.l2k.trivia2.service.DateService;

public class SessionExpirationArbiter {

	private long syncThreshold;
	private DateService dateService;

	public SessionExpirationArbiter(long syncThreshold, DateService dateService) {
		this.syncThreshold = syncThreshold;
		this.dateService = dateService;
	}

	public boolean isExpired(Session session) {
		return session.getStatus() == SessionStatus.READY_TO_SYNC &&
				dateService.getCurrentDate().after(lastUpdatePlusSyncThreshold(session));
	}
	
	private Date lastUpdatePlusSyncThreshold(Session session) {
		return new Date(session.getLastUpdated().getTime() + syncThreshold);
	}

}
