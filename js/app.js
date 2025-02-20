function fetchPokemon() {
    fetch("https://pokeapi.co/api/v2/generation/1/")
        .then(response => response.json())
        .then(function (allpokemon) {
            allpokemon.pokemon_species.forEach(function (pokemon) {
                fetchPokemonData(pokemon);
            })
        })
}


function fetchPokemonData(pokemon) {
    let url = pokemon.url
    fetch(url)
        .then(response => response.json())
        .then(function (pokeData) {
            console.log(pokeData)
            console.log(pokeData.stats)
        })
}

fetchPokemon();