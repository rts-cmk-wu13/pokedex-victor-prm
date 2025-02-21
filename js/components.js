function createHeader() {
    return `<div class="header-logo fxrow">
                <img class="header-logo__pokeball" src="./assets/svg/pokeball.svg" alt="Pokeball Logo">
                <h1>Pokedex</h1>
            </div>
            <nav class="search-and-sort fxrow">
                ${createSearchBar()}
                ${createSortMenu()}
            </nav>
    `
}

function createCard(pokeData) {
    let id = pokeData.id;
    let redirect = `./detail.html?id=${id}`;
    console.log(id, redirect);
    let paddedNum = String(id).padStart(3, '0');

    return `<article class="pokemon-card fxcol clickable-card">
                <p class="pokemon-card__number">#${paddedNum}</p>
                <div class="pokemon-card__overlay fxrow">
                    <p>${id}</p>
                    <p class="pokemon-card__name"><a class="pokemon-card__hidden-link" href="${redirect}">${pokeData.name}</a></p>
                </div>
                <div class="pokemon-card__image-container fxrow">
                    <img class="pokemon-card__image "src="${pokeData.image}" alt="">
                </div>
            </article>`
}

function createSearchBar() {
    return `<div class="search-bar-container fxrow">
                <img class="search-bar__search-icon" src="./assets/svg/search.svg" alt="Search Icon">
                <input class="search-bar" type="search" name="" id="">
                <button class="search-bar__delete-button header-button"><img src="./assets/svg/close.svg" alt=""></button>
            </div>`
}

function createSortMenu() {
    return `<button class="search-bar__sort-button header-button"><img src="./assets/svg/sort.svg" alt=""></button>`
}