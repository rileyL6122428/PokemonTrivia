package org.l2k.trivia2.repository;

import java.util.List;

import org.l2k.trivia2.domain.Pokemon;

public class PokemonRepository {

	private List<Pokemon> pokemon;
	
	public PokemonRepository(List<Pokemon> pokemon) {
		this.pokemon = pokemon;
	}

	public List<Pokemon> getAll() {
		return pokemon;
	}

}