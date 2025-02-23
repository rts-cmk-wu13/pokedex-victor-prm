let allpokemon = [];
let rootElm = document.querySelector(".content-wrapper");
let headerElm = document.createElement("header");
headerElm.classList.add("header-index");
let mainElm = document.createElement("main");
mainElm.classList.add("standard-grid");

let loaderElm = document.createElement("div");
loaderElm.classList.add("popover-overlay", "fxrow");
loaderElm.innerHTML = `<div class="loader"><img src="assets/svg/pokeball.svg" alt=""></div>`;

rootElm.append(headerElm, loaderElm, mainElm)
headerElm.innerHTML += createHeader();

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
    pokeArray.forEach((pokemon) => {
        allpokemon.push(pokemon)
        mainElm.innerHTML += createCard(pokemon);
    });
}

function colorBackgroundType(selector, type) {
    selector.removeEventListener("mouseout", backToNormal);
    
    let color = `color-mix(in srgb, ${getCSScolor('--color-'+type)} 10%, transparent)`;
    selector.closest("div").style.backgroundColor = color;
    selector.addEventListener("mouseout", backToNormal);

    function backToNormal(){
        selector.closest("div").style.backgroundColor =  'var(--gray-900)';
    }
}

function getCSScolor(varName){
    const root = document.documentElement;
    const currentColor = getComputedStyle(root).getPropertyValue(varName);
    return currentColor;
}

fetchPokemon();
