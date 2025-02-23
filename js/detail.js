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

    headerElm.innerHTML = populateHeader(pokemon);
    mainElm.innerHTML =  populateInfo(pokemon);

    rootElm.append(headerElm, mainElm);
    colorBackground(rootElm, type);
}

function populateHeader(pokemon) {
    let currentPage = window.location.href.split('?')[0];
    let previousLink = `${currentPage}?id=${pokemon.id - 1}`;
    let nextLink = `${currentPage}?id=${pokemon.id + 1}`;

    return `<div class="detail-top fxrow">
                <div class="detail-top__back-button">
                    <button class="header-button button-transparent" onclick="navigateToPage('index.html')"><img src="./assets/svg/arrow_back.svg" alt="Back arrow icon"></button>
                </div>
                <h1 class="detail-top__title">${pokemon.name}</h1>
                <p class="detail-top__number">#${padNumber(pokemon.id)}</p>
            </div>
            <div class="detail-navigation-arrows fxrow">
                <div class="detail-navigation-arrow__previous">
                    <button class="header-button button-transparent" onclick="navigateToPage('${previousLink}')"><img src="./assets/svg/chevron_left.svg" alt="Previous arrow icon"></button>
                </div>
                <div class="detail-navigation-arrow__next">
                    <button class="header-button button-transparent" onclick="navigateToPage('${nextLink}')"><img src="./assets/svg/chevron_right.svg" alt="Next arrow icon"></button>
                </div>
            </div>
            <div class="detail-image-container">
                <img class="detail-image-pokemon" src="${pokemon.sprites.other['dream_world'].front_default}" alt="Image of the pokemon name ${pokemon.name}">
                <img class="detail-image-pokemon" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="Image of the pokemon name ${pokemon.name}">
                <img class="detail-image-pokemon" src="${pokemon.sprites.other['home'].front_default}" alt="Image of the pokemon name ${pokemon.name}">
            </div>`
}


function colorBackground(elm, type) {
    //console.log(elm, type);
    let color = getCSScolor(`--color-${type}`);
    elm.style.backgroundColor = color;
}

function populateInfo(pokemon) {
    return  `<div class="detail-main">
                <img class="detail-main-image" src="${pokemon.sprites.other.showdown.front_default}" alt="">
                <img class="detail-main-image" src="${pokemon.sprites.other.showdown.back_default}" alt="">
            </div>`
}
