const pokeApi = {};

function convertApiToPokemonClass(pokemonapi) {
    return new Pokemon(pokemonapi.id, pokemonapi.name, pokemonapi.types,pokemonapi.sprites.front_default)
}
pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) =>
            response.json())
        .then((responseBody) =>
            responseBody.results)
        .then((pokemons) =>
            pokemons.map((pokemon) => fetch(pokemon.url)
                .then((response) => response.json())
                .then(convertApiToPokemonClass)))     
        .then((urlRequests) =>
            Promise.all(urlRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) =>
            console.error(error))
}