package org.l2k.trivia2.repository;

import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class NameRepository {
	
	private LinkedList<String> names;
	private boolean takeFromBeginningOfList;

	public NameRepository(@Autowired @Qualifier("userNames") LinkedList<String> names) {
		this.names = names;
	}

	public String takeName() {
		if (names.isEmpty()) { return null; }
		String nextName = takeFromBeginningOfList ? names.removeFirst() : names.removeLast();
		takeFromBeginningOfList = !takeFromBeginningOfList;
		return nextName;			
	}

}
