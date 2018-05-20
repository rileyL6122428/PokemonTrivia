package org.l2k.trivia2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

@SpringBootApplication
@EnableWebSocketMessageBroker
public class PokeTrivia {
	
	public static void main(String[] args) {
		SpringApplication.run(PokeTrivia.class, args);
	}

}
