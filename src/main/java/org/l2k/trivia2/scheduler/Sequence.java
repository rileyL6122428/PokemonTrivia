package org.l2k.trivia2.scheduler;

import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class Sequence {
	private Timer timer;
	private List<DelayedEvent> events;
	private int initialDelay;
	
	public Sequence(Timer timer, List<DelayedEvent> events, int initialDelay) {
		this.timer = timer;
		this.events = events;
		this.initialDelay = initialDelay;
	}
	
	public void execute() {
		int aggregateDelay = initialDelay;
		
		for(DelayedEvent event: events) {
			scheduleTask(event.getRunnable(), aggregateDelay);
			aggregateDelay += event.getDuration();
		}
	}
	
	private void scheduleTask(Runnable runnable, int delay) {
		timer.schedule(new TimerTask() {

			public void run() {
				runnable.run();
			}
			
		}, delay);
	}
}
