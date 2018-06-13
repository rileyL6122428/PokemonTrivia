package org.l2k.trivia2.constants;

import java.util.ArrayList;
import java.util.List;

import org.l2k.trivia2.domain.Pokemon;

public class PokemonConstants {
	
	public static final List<Pokemon> ROOM_MASCOTS = new ArrayList<Pokemon>() {{
		add(new Pokemon.Builder()
			.setName("Pikachu")
			.setIconFinderSVG(IconFinderSvgs.PIKACHU)
			.setDefaultSVG("")
		.build());
		
		add(new Pokemon.Builder()
			.setName("Eevee")
			.setIconFinderSVG(IconFinderSvgs.EEVEE)
			.setDefaultSVG("")
		.build());
	}};
	
}
