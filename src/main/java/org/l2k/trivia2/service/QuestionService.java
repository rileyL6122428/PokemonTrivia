package org.l2k.trivia2.service;

import java.util.LinkedList;

import org.l2k.trivia2.constants.PokemonConstants;
import org.l2k.trivia2.domain.game.Question;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

	public LinkedList<Question> getQuestions() {
		return new LinkedList<Question>() {{
			add(new Question.Builder()
					.setDescription("Which of the following pokemon is a grass type?")
					.setCorrectAnswer(PokemonConstants.BULBASAUR)
					.addIncorrectAnswer(PokemonConstants.CHARMANDER)
					.addIncorrectAnswer(PokemonConstants.SQUIRTLE)
				.build());
				
				add(new Question.Builder()
					.setDescription("Which of the following pokemon is a fire type?")
					.setCorrectAnswer(PokemonConstants.CHARMANDER)
					.addIncorrectAnswer(PokemonConstants.BULBASAUR)
					.addIncorrectAnswer(PokemonConstants.SQUIRTLE)
				.build());
				
				add(new Question.Builder()
					.setDescription("Which of the following pokemon is a water type?")
					.setCorrectAnswer(PokemonConstants.SQUIRTLE)
					.addIncorrectAnswer(PokemonConstants.BULBASAUR)
					.addIncorrectAnswer(PokemonConstants.CHARMANDER)
				.build());
				
				add(new Question.Builder()
					.setDescription("Which of the following pokemon has an evolution at level 32?")
					.setCorrectAnswer(PokemonConstants.BULBASAUR)
					.addIncorrectAnswer(PokemonConstants.CHARMANDER)
					.addIncorrectAnswer(PokemonConstants.SQUIRTLE)
				.build());
				
				add(new Question.Builder()
					.setDescription("In Gen 1, which of the following pokemon learns the attack, 'Bite'?")
					.setCorrectAnswer(PokemonConstants.SQUIRTLE)
					.addIncorrectAnswer(PokemonConstants.CHARMANDER)
					.addIncorrectAnswer(PokemonConstants.BULBASAUR)
				.build());
				
				add(new Question.Builder()
					.setDescription("In Gen 1, which of the following pokemon cannot learn the attack, 'Swords Dance'?")
					.setCorrectAnswer(PokemonConstants.SQUIRTLE)
					.addIncorrectAnswer(PokemonConstants.CHARMANDER)
					.addIncorrectAnswer(PokemonConstants.BULBASAUR)
				.build());
			}};
	}
	
}
