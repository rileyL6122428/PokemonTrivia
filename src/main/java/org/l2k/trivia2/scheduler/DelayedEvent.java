package org.l2k.trivia2.scheduler;

public class DelayedEvent {
	
	private final Runnable runnable;
	private final int delay;
	
	public DelayedEvent(Runnable runnable, int delay) {
		this.runnable = runnable;
		this.delay = delay;
	}
	
	public int getDelay() {
		return delay;
	}
	
	public Runnable getRunnable() {
		return runnable;
	}
}
