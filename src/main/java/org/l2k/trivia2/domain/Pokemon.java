package org.l2k.trivia2.domain;

public class Pokemon {
	
	private String name;
	private String iconFindersSVG;
	private String defaultSVG;
	
	private Pokemon(
		String name,
		String iconFindersSVG,
		String defaultSVG
	) {
		this.name = name;
		this.iconFindersSVG = iconFindersSVG;
		this.defaultSVG = defaultSVG;
	}
	
	public String getName() {
		return name;
	}
	
	public String getIconFindersSVG() {
		return iconFindersSVG;
	}
	
	public String getDefaultSVG() {
		return defaultSVG;
	}
	
	@Override
	public boolean equals(Object object) {
		if (object == null || !(object instanceof Pokemon)) { return false; }
		Pokemon otherPokemon = (Pokemon) object;
		return name.equalsIgnoreCase(otherPokemon.getName());
	}
	
	@Override
	public int hashCode() {
		return name.hashCode();
	}
	
	static public class Builder {
		
		private String name;
		private String iconFindersSVG;
		private String defaultSVG;
		
		public Builder setName(String name) {
			this.name = name; return this;
		}
		
		public Builder setIconFinderSVG(String icon) {
			this.iconFindersSVG = icon; return this;
		}
		
		public Builder setDefaultSVG(String defaultSVG) {
			this.defaultSVG = defaultSVG; return this;
		}
		
		public Pokemon build() {
			return new Pokemon(
				name,
				iconFindersSVG,
				defaultSVG
			);
		}
	}

}
