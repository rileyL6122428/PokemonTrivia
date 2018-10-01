package org.l2k.trivia2.domain.game;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.l2k.trivia2.domain.Pokemon;

public class Question {
	
	private String description;
	private Pokemon correctAnswer;
	private List<Pokemon> answers;
	private Map<String, Pokemon> playerAnswers;
	
	public Question(
		String description,
		Pokemon correctAnswer,
		List<Pokemon> answers
	) {
		this.description = description;
		this.correctAnswer = correctAnswer;
		this.answers = answers;
		this.playerAnswers = new HashMap<String, Pokemon>();
	}
	
	public String getDescription() {
		return description;
	}
	
	String getCorrectAnswerName() {
		return correctAnswer.getName();  
	}
	
	public List<String> getShuffledAnswers() {
		return answers
				.stream()
				.map(Pokemon::getName)
				.collect(Collectors.toList());
	}
	
	public void submitAnswer(String playerName, Pokemon answer) {
		Pokemon submittedAnswer = playerAnswers.get(playerName);
		if (submittedAnswer == null) {
			playerAnswers.put(playerName, answer);
		}
	}
	
	public List<String> playersWithCorrectAnswers() {
		return playerAnswers
				.keySet()
				.stream()
				.filter((String playerName) -> {
					Pokemon playerAnswer = playerAnswers.get(playerName);
					return playerAnswer != null && playerAnswer.equals(correctAnswer); 
				})
				.collect(Collectors.toList());
	}
	
	public static class Builder {
		
		private String description;
		private Pokemon correctAnswer;
		private List<Pokemon> answers;
		
		public Builder() {
			this.answers = new ArrayList<Pokemon>();
		}
		
		public Builder setDescription(String description) {
			this.description = description; return this;
		}
		
		public Builder setCorrectAnswer(Pokemon correctAnswer) {
			this.correctAnswer = correctAnswer; return this;
		}
		
		public Builder addIncorrectAnswer(Pokemon incorrectAnswer) {
			answers.add(incorrectAnswer); return this;
		}
		
		public Question build() {
			answers.add(correctAnswer);
			Collections.shuffle(answers);
			
			return new Question(
				description,
				correctAnswer,
				answers
			);
					
		}
		
	}
	
}
