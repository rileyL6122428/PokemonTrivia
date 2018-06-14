Return Rooms, Chats, Games, as separate objects with same lookup key 
(pokemon mascot name, that way you don't have to ship unnecessary details,
like pokemon icons)



Have services on front end for holding domain objects, including pokemon.

For objects that need to link, hold a lambda reference to look up a linked object

For example

new Room({
    mascotName: "Pikachu",
    mascotLookup: () => pokemonService.get("Pikachu")
})