package org.l2k.trivia2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import static org.l2k.trivia2.constants.ControllerConstants.*;

@Controller
public class StaticContentController {
	
	@GetMapping(Paths.ROOT)
	public ModelAndView getPokeTriviaClient() {
		return new ModelAndView(Clients.POKE_TRIVIA);
	}

}
