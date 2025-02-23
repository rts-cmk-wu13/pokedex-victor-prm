const urlParams = new URLSearchParams(window.location.search);
const pokeID = urlParams.get('id');

const url = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
fetch(url).then(res => res.json()).then(pokemon => populateDetail(pokemon));


function populateDetail(pokemon) {
    console.log(pokemon)
    let type = pokemon.types[0].type.name;
    let rootElm = document.querySelector(".detail-wrapper");
    let headerElm = document.createElement("header");
    headerElm.classList.add("header-detail", "fxcol");

    let mainElm = document.createElement("main");
    mainElm.classList.add("detail-card");

    headerElm.innerHTML =   `<div class="detail-top fxrow">
                                <div class="detail-top__back-button">
                                    <img src="./assets/svg/arrow_back.svg" alt="Back arrow icon">
                                </div>
                                <h1>${pokemon.name}</h1>
                                <p>${padNumber(pokemon.id)}</p>
                            </div>
                            <div class="detail-navigation-arrows fxrow">
                                <div class="detail-navigation-arrow__previous">
                                    <img src="./assets/svg/chevron_left.svg" alt="Previous arrow icon">
                                </div>
                                <div class="detail-navigation-arrow__next">
                                    <img src="./assets/svg/chevron_right.svg" alt="Next arrow icon">
                                </div>
                            </div>
                            <div class="detail-image-container">
                                <img class="detail-image-pokemon" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="Image of the pokemon name ${pokemon.name}">
                            </div>

    `

    rootElm.append(headerElm, mainElm);
    colorBackground(headerElm, type);



}

function colorBackground(elm, type) {
    console.log(elm, type);
    let color = getCSScolor(`--color-${type}`);
    elm.style.backgroundColor = color
} 