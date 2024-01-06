const pokemonsList = document.getElementById("pokemons-list");
const loadMoreButton = document.getElementById("loadMore");
const limit = 20;
let offset = 0;
const maxPokemons = 200;

function convertPokemonTypesToLi(pokemonsTypes, pokemonMainType) {
    return pokemonsTypes.map((type) => `<li class="type ${type}">${type}</li>`).join("")
}

function convertPokemonToHTML(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="pokemon-number">#${pokemon.number}</span>
            <span class="pokemon-name">${pokemon.name}</span>
            <div class="pokemon-details">
                <ol class="pokemon-details-types">
                    ${convertPokemonTypesToLi(pokemon.types, pokemon.type)}
                </ol>
                <img src="${pokemon.photo}", alt = "${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{

        const newList = pokemons.map((pokemon) => convertPokemonToHTML(pokemon));

        const newHtml = newList.join("");
        pokemonsList.innerHTML += newHtml;

    })
    .catch((error) => 
        console.error(error))    
}

loadPokemons(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;

    const quantPokemons = offset + limit;

    loadPokemons(offset, limit);

    console.log(quantPokemons);
    if(quantPokemons >= maxPokemons){
        console.log("entrou");
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
})