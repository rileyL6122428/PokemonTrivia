package org.l2k.trivia2.service;

import java.util.Date;

import org.l2k.trivia2.domain.P2PSession;
import org.l2k.trivia2.domain.SessionStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class SessionExpirationArbiter {

	private long syncThreshold;
	private DateService dateService;

	@Autowired
	public SessionExpirationArbiter(@Qualifier("EXPIRATION_SYNC_THRESHOLD") long syncThreshold, DateService dateService) {
		this.syncThreshold = syncThreshold;
		this.dateService = dateService;
	}

	public boolean isExpired(P2PSession session) {
		return session.getStatus() == SessionStatus.READY_TO_SYNC &&
				dateService.getCurrentDate().after(lastUpdatePlusSyncThreshold(session));
	}
	
	private Date lastUpdatePlusSyncThreshold(P2PSession session) {
		return new Date(session.getLastUpdated().getTime() + syncThreshold);
	}

}
