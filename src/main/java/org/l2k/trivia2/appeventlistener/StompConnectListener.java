package org.l2k.trivia2.appeventlistener;

import org.l2k.trivia2.service.P2PSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

@Component
public class StompConnectListener implements ApplicationListener<SessionConnectEvent>{

	P2PSessionService sessionService;
	
	@Autowired
	public StompConnectListener(P2PSessionService sessionService) {
		this.sessionService = sessionService;
	}
	
	@Override
	public void onApplicationEvent(SessionConnectEvent event) {
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
		String sessionId = headerAccessor.getFirstNativeHeader("sessionId");
		sessionService.syncWebSocketSession(sessionId);
	}

}
