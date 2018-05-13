package org.l2k.trivia2.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.l2k.trivia2.domain.P2PSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class SessionTable {

	private Map<String, P2PSession> sessions;
	
	@Autowired
	public SessionTable(@Qualifier("SESSIONS") HashMap<String, P2PSession> sessions) {
		this.sessions = sessions;
	}

	public List<P2PSession> clearRecords(Predicate<P2PSession> predicate) {
		return new ArrayList<P2PSession>(sessions.values())
			.stream()
			.filter(predicate)
			.map((session) -> sessions.remove(session.getId()))
			.collect(Collectors.toCollection(ArrayList::new));
	}

	public void saveRecord(P2PSession session) {
		if(session != null) { 
			sessions.put(session.getId(), session);
		}
	}

	public boolean contains(P2PSession session1) {
		return sessions.containsKey(session1.getId());
	}

}
