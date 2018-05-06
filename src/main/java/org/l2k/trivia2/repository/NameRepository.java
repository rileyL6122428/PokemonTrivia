package org.l2k.trivia2.repository;

import java.util.LinkedList;

public class NameRepository {
	
	private LinkedList<String> names;
	private boolean takeFromBeginningOfList;

	public NameRepository(LinkedList<String> names) {
		this.names = names;
	}

	public String takeName() {
		if (names.isEmpty()) { return null; }
		String nextName = takeFromBeginningOfList ? names.removeFirst() : names.removeLast();
		takeFromBeginningOfList = !takeFromBeginningOfList;
		return nextName;			
	}

}
