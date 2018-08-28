package org.l2k.trivia2.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Question {
	
	private String description;
	private Pokemon answer;
	private Pokemon incorrectAnswerA;
	private Pokemon incorrectAnswerB;
	private Map<String, Pokemon> playerAnswers;
	
	public Question(
		String description,
		Pokemon answer,
		Pokemon incorrectAnswerA,
		Pokemon incorrectAnswerB
	) {
		this.description = description;
		this.answer = answer;
		this.incorrectAnswerA = incorrectAnswerA;
		this.incorrectAnswerB = incorrectAnswerB;
		this.playerAnswers = new HashMap<String, Pokemon>();
	}
	
	public String getDescription() {
		return description;
	}
	
	public List<String> getShuffledAnswers() {
		List<String> answers = new ArrayList<String>() {{
			add(answer.getName());
			add(incorrectAnswerA.getName());
			add(incorrectAnswerB.getName());
		}};
		
		Collections.shuffle(answers);
		return answers;
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
					return playerAnswer != null && playerAnswer.equals(answer); 
				})
				.collect(Collectors.toList());
	}
	
	public static class Builder {
		
		private String description;
		private Pokemon answer;
		private Pokemon incorrectAnswerA;
		private Pokemon incorrectAnswerB;
		
		public Builder setDescription(String description) {
			this.description = description; return this;
		}
		
		public Builder setAnswer(Pokemon answer) {
			this.answer = answer; return this;
		}
		
		public Builder setIncorrectAnswerA(Pokemon answer) {
			incorrectAnswerA = answer; return this;
		}
		
		public Builder setIncorrectAnswerB(Pokemon answer) {
			incorrectAnswerB = answer; return this;
		}
		
		public Question build() {
			return new Question(
				description,
				answer,
				incorrectAnswerA,
				incorrectAnswerB
			);
					
		}
		
	}
	
}
