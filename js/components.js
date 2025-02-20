function createHeader(){
    return  `<div class="header-logo fxrow">
                <img class="header-logo__pokeball" src="./assets/svg/pokeball.svg" alt="Pokeball Logo">
                <h1>Pokedex</h1>
            </div>
            <nav class="search-and-sort fxrow">
                ${createSearchBar()}
                ${createSortMenu()}
            </nav>
    `
}

function createCard(pokeData){
    let paddedNum = String(pokeData.id).padStart(3, '0');

    return  `<article class="pokemon-card fxcol">
                <p class="pokemon-card__number">#${paddedNum}</p>
                <div class="pokemon-card__overlay fxrow">
                    <p class="pokemon-card__name">${pokeData.name}</p>
                </div>
                <div class="pokemon-card__image-container fxrow">
                    <img class="pokemon-card__image "src="${pokeData.sprites.other['official-artwork'].front_default}" alt="">
                </div>
                
            </article>`
}

function createSearchBar(){
    return  `<div class="search-bar-container fxrow">
                <img class="search-bar__search-icon" src="./assets/svg/search.svg" alt="Search Icon">
                <input class="search-bar" type="search" name="" id="">
                <button class="search-bar__delete-button header-button"><img src="./assets/svg/close.svg" alt=""></button>
            </div>`
}

function createSortMenu(){
    return  `<button class="search-bar__sort-button header-button"><img src="./assets/svg/sort.svg" alt=""></button>`
}