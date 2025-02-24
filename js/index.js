let allpokemon = [];
let rootElm = document.querySelector(".content-wrapper");
let headerElm = document.createElement("header");
headerElm.classList.add("header-index");
let mainElm = document.createElement("main");
mainElm.classList.add("standard-grid");

let loaderElm = document.createElement("div");
loaderElm.classList.add("popover-overlay", "fxrow", "hidden");
loaderElm.innerHTML = `<div class="loader"><img src="assets/svg/pokeball.svg" alt=""></div>`;

rootElm.append(headerElm, loaderElm, mainElm)
headerElm.innerHTML += createHeader();


const fetchPokemon = () => {
    documentIsLoading(true);
    const promises = [];
    for (let i = 1; i <= 48; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites.other['official-artwork'].front_default,
            type: result.types.map((type) => type.type.name),
            id: result.id
        })).sort((a, b) => a.id > b.id ? 1 : -1);
        populateArray(pokemon);
        documentIsLoading(false);
    })
};

/*     POPULATE ARRAYS     */
function populateArray(pokeArray) {
    pokeArray.forEach((pokemon) => {
        allpokemon.push(pokemon);
    });
    populateGrid(allpokemon);
}


function populateGrid(pokeArray) {
    mainElm.innerHTML = "";
    pokeArray.forEach((pokemon) => {
        mainElm.innerHTML += createCard(pokemon);
    });
}

fetchPokemon();
