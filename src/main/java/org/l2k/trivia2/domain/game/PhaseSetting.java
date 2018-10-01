package org.l2k.trivia2.domain.game;

public class PhaseSetting {
	
	private int durationMilliseconds;
	
	private PhaseSetting(int durationMilliseconds) {
		this.durationMilliseconds = durationMilliseconds;
	}
	
	public int getDuration() {
		return durationMilliseconds;
	}
	
	static class Builder {
		
		private int durationMilliseconds;
		
		public Builder setDurationMilliseconds(int durationMilliseconds) {
			this.durationMilliseconds = durationMilliseconds; return this;
		}
		
		public PhaseSetting build() {
			return new PhaseSetting(durationMilliseconds);
		}
	}
}
