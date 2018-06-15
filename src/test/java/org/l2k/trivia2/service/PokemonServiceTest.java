package org.l2k.trivia2.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Pokemon;
import org.l2k.trivia2.repository.PokemonRepository;
import org.mockito.Mock;
import static org.mockito.Mockito.*;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PokemonServiceTest {
	
	private PokemonService pokemonService;
	@Mock private PokemonRepository pokemonRepo;
	
	@BeforeEach
	void setup() {
		pokemonService = new PokemonService(pokemonRepo);
	}
	
	@Nested
	class GetAll{
		
		private List<Pokemon> pokemon;
		
		@BeforeEach
		void setup() {
			pokemon = new ArrayList<Pokemon>() {{
				add(new Pokemon.Builder().setName("PIKACHU").build());
				add(new Pokemon.Builder().setName("EEVEE").build());
			}};
		}
		
		@Test
		void getsAllPokemonFromRepo() {
			when(pokemonRepo.getAll()).thenReturn(pokemon);
			List<Pokemon> returnedPokemon = pokemonService.getAll();
			assertEquals(pokemon, returnedPokemon);
		}
	}
	

}