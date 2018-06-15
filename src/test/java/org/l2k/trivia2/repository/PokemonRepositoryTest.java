package org.l2k.trivia2.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.l2k.trivia2.domain.Pokemon;

import name.falgout.jeffrey.testing.junit5.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class PokemonRepositoryTest {
	
	private PokemonRepository pokemonRepository;
	private List<Pokemon> pokemon;
	
	@BeforeEach
	void setup() {
		pokemon = new ArrayList<Pokemon>() {{
			add(new Pokemon.Builder().setName("PIKACHU").build());
			add(new Pokemon.Builder().setName("EEVEE").build());
		}};
		
		pokemonRepository = new PokemonRepository(pokemon);
	}

	@Nested
	class GetAll {
		
		@Test
		void returnsAllPokemonInRepo() {
			List<Pokemon> returnedPokemon = pokemonRepository.getAll();
			assertEquals(pokemon.size(), returnedPokemon.size());
			for(Pokemon pokemon : pokemon) {
				assertTrue(returnedPokemon.contains(pokemon));
			}
		}
		
	}
}
