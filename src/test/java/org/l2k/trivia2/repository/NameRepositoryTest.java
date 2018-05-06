package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.LinkedList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class NameRepositoryTest {
	
	private NameRepository nameRepository;

	@Nested
	class TakeName {
		
		@BeforeEach
		public void setup() {
			nameRepository = new NameRepository(new LinkedList<String>() {{
				add("NAME_1");
				add("NAME_2");
				add("NAME_3");
				add("NAME_4");
				add("NAME_5");
			}});			
		}
		
		@Test
		void takesNamesFromEndsOfSuppliedLinkedListInAlternatingOrder() {
			assertEquals("NAME_5", nameRepository.takeName());
			assertEquals("NAME_1", nameRepository.takeName());
			assertEquals("NAME_4", nameRepository.takeName());
			assertEquals("NAME_2", nameRepository.takeName());
			assertEquals("NAME_3", nameRepository.takeName());
		}
		
		@Test
		void returnsNullWhenAllNamesTaken() {
			for(int counter = 1; counter <= 5; counter++) {
				nameRepository.takeName();
			}
			
			assertNull(nameRepository.takeName());
		}
	}

}
