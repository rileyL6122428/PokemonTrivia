package org.l2k.trivia2.appeventlistener;

import org.springframework.context.ApplicationListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;

@Component
public class StompConnectListener implements ApplicationListener<SessionConnectEvent>{

	@Override
	public void onApplicationEvent(SessionConnectEvent event) {
		Message<byte[]> message = event.getMessage();
		StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
		String sessionId = headerAccessor.getFirstNativeHeader("sessionId");
		System.out.println(message);
		System.out.println(headerAccessor);
		System.out.println(sessionId);
	}

}
