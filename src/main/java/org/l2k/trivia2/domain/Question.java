package org.l2k.trivia2.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Question {
	
	private String description;
	private Pokemon answer;
	private Pokemon incorrectAnswerA;
	private Pokemon incorrectAnswerB;
	
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
