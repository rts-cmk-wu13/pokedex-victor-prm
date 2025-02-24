const urlParams = new URLSearchParams(window.location.search);
const pokeID = urlParams.get('id');

const url = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
fetch(url).then(res => res.json()).then(pokemon => populateDetail(pokemon));


function populateDetail(pokemon) {
    console.log(pokemon)
    let type = pokemon.types[0].type.name;
    let mainColor = getCSScolor(`--color-${type}`);
    let rootElm = document.querySelector(".detail-wrapper");
    let headerElm = document.createElement("header");
    headerElm.classList.add("header-detail", "fxcol");

    let mainElm = document.createElement("main");
    mainElm.classList.add("detail-card");

    headerElm.innerHTML = populateHeader(pokemon);
    mainElm.innerHTML = populateInfo(pokemon);

    rootElm.append(headerElm, mainElm);
    rootElm.style.backgroundColor = mainColor;
}

function populateHeader(pokemon) {
    return `<div class="detail-top fxrow">
                <div class="detail-top__back-button">
                    <button class="header-button button-transparent" onclick="navigateToPage('index.html')"><img src="./assets/svg/arrow_back.svg" alt="Back arrow icon"></button>
                </div>
                <h1 class="detail-top__title">${pokemon.name}</h1>
                <p class="detail-top__number">#${padNumber(pokemon.id)}</p>
            </div>
            <div class="detail-navigation-arrows fxrow">
                    ${changeIndexButton(pokemon, false)}
                    ${changeIndexButton(pokemon, true)}
            </div>
            <div class="detail-image-container">
                <img class="detail-image-pokemon" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="Image of the pokemon name ${pokemon.name}">
            </div>`
}



function populateInfo(pokemon) {
    return `<div class="detail-main fxrow">
                <section class="detail-main__types-container fxrow">
                   ${createTypePills(pokemon.types)}
                </section>  
            </div>`
}

function createDetailSection(title, content) {
    return `<section class="detail-section detail-section--${title} fxrow">
                <h2 class="detail-section__title detail-section__title--${title}">${title}</h2>
                <div class="detail-section__content-container detail-section__content-container--${title}">
                    ${content ? content : ""}
                </div>
            </section>`
}

function createTypePills(pokeTypes) {
    let pills = pokeTypes.map(pokeType => createTypePill(pokeType.type.name)).join("");
    return pills;

    function createTypePill(pokeType) {
        console.log(pokeType);
        return `<div class="pokemon-type-pill fxrow" style="background-color: ${getCSScolor('--color-' + pokeType)}">
                    <p class="pokemon-type-pill__text">${pokeType}</p>
                </div>`
    }
}

function images() {
    `<img class="detail-image-pokemon" src="${pokemon.sprites.other['dream_world'].front_default}" alt="Image of the pokemon name ${pokemon.name}">
    <img class="detail-image-pokemon" src="${pokemon.sprites.other['home'].front_default}" alt="Image of the pokemon name ${pokemon.name}"></img>
    <img class="detail-main-image" src="${pokemon.sprites.other.showdown.front_default}" alt="">
    <img class="detail-main-image" src="${pokemon.sprites.other.showdown.back_default}" alt="">
    `
}

function changeIndexButton(pokemon, isNext) {
    if ((pokemon.id == 1 && !isNext) || (pokemon.id == 1025 && isNext)) {
        return "";
    }

    let link, iconPath, cssModifier;
    let currentPage = window.location.href.split('?')[0];


    link = `${currentPage}?id=${isNext ? pokemon.id + 1 : pokemon.id - 1}`;
    iconPath = `./assets/svg/chevron_${isNext ? 'right' : 'left'}` + ".svg";
    cssModifier = isNext ? 'next' : 'previous';
    console.log(link, iconPath, cssModifier);

    return `<div class="detail-navigation-arrow detail-navigation-arrow--${cssModifier}">
                <button class="header-button button-transparent" onclick="navigateToPage('${link}')"><img src="${iconPath}" alt="${cssModifier} arrow icon"></button>
            </div>`
}

