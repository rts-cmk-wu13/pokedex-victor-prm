let rootElm = document.querySelector(".content-wrapper");
let headerElm = document.createElement("header");
let mainElm = document.createElement("main");
mainElm.classList.add("standard-grid");

let loaderElm = document.createElement("div");
loaderElm.classList.add("loader-overlay","fxrow");
loaderElm.innerHTML = `<div class="loader"><img src="assets/svg/pokeball.svg" alt=""></div>`;



rootElm.append(headerElm, loaderElm, mainElm)
headerElm.innerHTML += createHeader();


let allpokemon = [];


function sortArray() {
    allpokemon.sort((a, b) => a.id > b.id ? 1 : -1);
}

const fetchPokemon = () => {
    showLoader(true);
    const promises = [];
    for (let i = 1; i <= 50; i++) {
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
        populateGrid(pokemon);
        showLoader(false);
    })
};
function populateGrid(pokeArray) {
    pokeArray.forEach(pokemon => {
        mainElm.innerHTML += createCard(pokemon);
    });
}

function showLoader(bool){
    let modifier = "hidden"
    bool ? loaderElm.classList.remove(modifier) : loaderElm.classList.add(modifier);
}

fetchPokemon();
