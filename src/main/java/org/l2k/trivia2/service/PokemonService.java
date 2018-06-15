package org.l2k.trivia2.service;

import java.util.List;

import org.l2k.trivia2.domain.Pokemon;
import org.l2k.trivia2.repository.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PokemonService {

	private PokemonRepository pokemonRepository;

	@Autowired
	public PokemonService(PokemonRepository pokemonRepository) {
		this.pokemonRepository = pokemonRepository;
	}

	public List<Pokemon> getAll() {
		return pokemonRepository.getAll();
	}

}