package org.l2k.trivia2.domain.game;

import java.util.HashMap;
import java.util.Map;

public class PhaseSettings {
	
	private Map<Phase, PhaseSetting> settingsByPhase;
	
	public PhaseSettings() {
		this.settingsByPhase = new HashMap<Phase, PhaseSetting>(){{
			put(Phase.NOT_STARTED, 
					new PhaseSetting.Builder()
						.setDurationMilliseconds(5000)
					.build()
			);
			
			put(Phase.ASKING_QUESTION, 
					new PhaseSetting.Builder()
						.setDurationMilliseconds(8000)
					.build()
			);
			
			put(Phase.REVEALING_ANSWER, 
					new PhaseSetting.Builder()
						.setDurationMilliseconds(6000)
					.build()
			);
			
			put(Phase.STAGING_NEXT_QUESTION, 
					new PhaseSetting.Builder()
						.setDurationMilliseconds(3000)
					.build()
			);
			
			put(Phase.REVEALING_ANSWER, 
					new PhaseSetting.Builder()
						.setDurationMilliseconds(8000)
					.build()
			);
		}};
	}
	
	public int getDuration(Phase phase) {
		return settingsByPhase.get(phase).getDuration();
	}
	
}
