package org.l2k.trivia2.constants;

import java.util.ArrayList;
import java.util.List;

import org.l2k.trivia2.domain.Pokemon;

public class PokemonConstants {
	
	public static final Pokemon PIKACHU = new Pokemon.Builder()
			.setName("Pikachu")
			.setIconFinderSVG(IconFinderSvgs.PIKACHU)
			.setDefaultSVG("")
		.build();
	
	public static final Pokemon EEVEE = new Pokemon.Builder()
			.setName("Eevee")
			.setIconFinderSVG(IconFinderSvgs.EEVEE)
			.setDefaultSVG("")
		.build();
	
	public static final Pokemon CHARMANDER = new Pokemon.Builder()
			.setName("Charmander")
			.setIconFinderSVG("")
			.setDefaultSVG(PokemonSvgs.CHARMANDER)
		.build();
	
	public static final Pokemon BULBASAUR = new Pokemon.Builder()
			.setName("Bulbasaur")
			.setIconFinderSVG("")
			.setDefaultSVG(PokemonSvgs.BULBASAUR)
		.build();
	
	public static final Pokemon SQUIRTLE = new Pokemon.Builder()
			.setName("Squirtle")
			.setIconFinderSVG("")
			.setDefaultSVG(PokemonSvgs.SQUIRTLE)
		.build(); 
	
	public static final List<Pokemon> ALL_POKEMON = new ArrayList<Pokemon>() {{
		add(PIKACHU);
		add(EEVEE);
		add(CHARMANDER);
		add(BULBASAUR);
		add(SQUIRTLE);
	}};
	
	public static final List<Pokemon> ROOM_MASCOTS = new ArrayList<Pokemon>() {{
		add(PIKACHU);
		add(EEVEE);
	}};
	
}
