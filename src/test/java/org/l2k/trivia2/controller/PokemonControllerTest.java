package org.l2k.trivia2.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Pokemon;
import org.l2k.trivia2.service.PokemonService;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PokemonControllerTest {

	private PokemonController pokemonController;
	@Mock private PokemonService pokemonService;
	
	@BeforeEach
	void setup() {
		pokemonController = new PokemonController(pokemonService);
	}
	
	@Nested
	class GetAllPokemon {
		
		private List<Pokemon> pokemon;
		
		@BeforeEach
		void setup() {			
			pokemon = new ArrayList<Pokemon>(){{
				add(new Pokemon.Builder().build());
				add(new Pokemon.Builder().build());
			}};
			
			when(pokemonService.getAll()).thenReturn(pokemon);
		}
		
		@Test
		void returnsListOfPokemonProvidedByPokemonService() {
			ResponseEntity<List<Pokemon>> response = pokemonController.getAllPokemon();
			assertEquals(pokemon, response.getBody());
		}
		
		@Test
		void returns200Response() {
			ResponseEntity<List<Pokemon>> response = pokemonController.getAllPokemon();
			assertEquals(HttpStatus.OK, response.getStatusCode());
		}
		
	}
	
}
