package org.l2k.trivia2.constants;

public class ControllerConstants {
	
	public static class PathVariables {
		public static final String ROOM_NAME = "ROOM_NAME";
	}
	
	public static class Paths {
		public static final String ROOT = "/";
		public static final String SESSION = "/session";
		public static final String ROOMS = "/rooms";
		public static final String POKEMON = "/pokemon";
		public static final String JOIN_ROOM = "/join-room/{" + PathVariables.ROOM_NAME + "}";
	}
	
	
	public static class Clients {
		public static final String POKE_TRIVIA = "index.html"; 
	}

}
