package org.l2k.trivia2.repository;

import java.util.List;

import org.l2k.trivia2.domain.Pokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class PokemonRepository {

	private List<Pokemon> pokemon;
	
	@Autowired
	public PokemonRepository(@Qualifier("pokemon") List<Pokemon> pokemon) {
		this.pokemon = pokemon;
	}

	public List<Pokemon> getAll() {
		return pokemon;
	}

}