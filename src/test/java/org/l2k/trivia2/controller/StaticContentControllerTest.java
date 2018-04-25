package org.l2k.trivia2.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.l2k.trivia2.constants.ControllerConstants.Clients;
import org.springframework.web.servlet.ModelAndView;

class StaticContentControllerTest {
	
	@Test
	void returnsPokeTriviaClient() {
		StaticContentController staticContentController = new StaticContentController();
		ModelAndView pokeTriviaClient = staticContentController.getPokeTriviaClient();
		assertEquals(Clients.POKE_TRIVIA, pokeTriviaClient.getViewName());
	}

}
