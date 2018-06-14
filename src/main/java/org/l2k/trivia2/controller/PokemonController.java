package org.l2k.trivia2.controller;

import java.util.List;

import org.l2k.trivia2.domain.Pokemon;
import org.l2k.trivia2.service.PokemonService;
import org.springframework.http.ResponseEntity;

public class PokemonController {

	private PokemonService pokemonService;

	public PokemonController(PokemonService pokemonService) {
		this.pokemonService = pokemonService;
	}

	public ResponseEntity<List<Pokemon>> getAllPokemon() {
		return ResponseEntity.ok(pokemonService.getAll());
	}
	
	

}
