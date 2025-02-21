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
    let paddedNum = String(id).padStart(3, '0');
    let semiRandomID = id+pokeData.type[0];

    return `<article class="pokemon-card fxcol clickable-card">
                <p class="pokemon-card__number">#${paddedNum}</p>
                <div class="pokemon-card__overlay fxrow" id="${semiRandomID}">
                    <p class="pokemon-card__name"><a class="pokemon-card__hidden-link" href="${redirect}" onmouseover="colorBackgroundType(this, '${pokeData.type[0]}')">${pokeData.name}</a></p>
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
    return `<div class="search-bar__sort-container">
                <button class="search-bar__sort-button header-button"><img src="./assets/svg/sort.svg" alt="" popovertarget="dropdown-all" popovertargetaction="hide" onclick="console.log('click')"></button>
                <div class="search-bar__sort-dropdown-all" popover id="dropdown-all">
                    <div class="search-bar__sort-dropdown-container">
                        <p class="search-bar__sort-dropdown-title">Sort By:</p>
                        <div class="search-bar__sort-dropdown">
                            <form action="">
                                ${createSortItem("Number")}
                                ${createSortItem("Letter")}
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
}

function createSortItem(content) {
    console.log(content)
    let id = content.toLowerCase();
    let value = content.toUpperCase();
    return `<div class="search-bar__sort-dropdown-item">
                <input type="radio" id="${id}" name="sort-selection" value="${value}">
                <label for="${id}">${content}</label>
            </div>`
}

function showLoader(bool) {
    let modifier = "hidden"
    bool ? loaderElm.classList.remove(modifier) : loaderElm.classList.add(modifier);
}