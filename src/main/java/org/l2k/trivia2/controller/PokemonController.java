package org.l2k.trivia2.controller;

import java.util.List;

import org.l2k.trivia2.constants.ControllerConstants.Paths;
import org.l2k.trivia2.domain.Pokemon;
import org.l2k.trivia2.service.PokemonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PokemonController {

	private PokemonService pokemonService;

	@Autowired
	public PokemonController(PokemonService pokemonService) {
		this.pokemonService = pokemonService;
	}

	@GetMapping(Paths.POKEMON)
	public ResponseEntity<List<Pokemon>> getAllPokemon() {
		return ResponseEntity.ok(pokemonService.getAll());
	}
	
	

}
