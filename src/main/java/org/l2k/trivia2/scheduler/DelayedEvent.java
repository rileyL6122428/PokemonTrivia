package org.l2k.trivia2.scheduler;

public class DelayedEvent {
	
	private final Runnable runnable;
	private final int duration;
	
	public DelayedEvent(Runnable runnable, int duration) {
		this.runnable = runnable;
		this.duration = duration;
	}
	
	public int getDuration() {
		return duration;
	}
	
	public Runnable getRunnable() {
		return runnable;
	}
}
