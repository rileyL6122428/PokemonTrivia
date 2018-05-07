package org.l2k.trivia2.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Predicate;

import org.l2k.trivia2.domain.Session;

public class SessionTable {

	private Map<String, Session> sessions;

	public SessionTable(HashMap<String, Session> sessions) {
		this.sessions = sessions;
	}

	public void clearRecords(Predicate<Session> predicate) {
		// TODO Auto-generated method stub
		
	}

	public void saveRecord(Session session) {
		if(session != null) { 
			sessions.put(session.getId(), session);
		}
	}

	public boolean contains(Session session1) {
		return sessions.containsKey(session1.getId());
	}

}
