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

/* ${createSortItem("Number")}
${createSortItem("Letter")} */

function createSortMenu() {
    return `<div class="search-bar__sort-container">
                <button class="search-bar__sort-button header-button" onclick="toggleMenu('dropdown-menu-sort',1,1)"><img src="./assets/svg/sort.svg" alt=""></button>
                <dialog class="search-bar__sort-dropdown-container" id="dropdown-menu-sort">
                    <p class="search-bar__sort-dropdown-title">Sort By:</p>
                    <div class="search-bar__sort-dropdown">
                        <form action="search-bar__sort-form">
                            ${createSortItem("Number")}
                            ${createSortItem("Name")}
                        </form>
                    </div>
                </dialog>
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

function toggleMenu(targetID, isModal, isDismissable) {
    //Get the dialog element
    let targetElm = document.querySelector("#" + targetID);

    //Toggle open/close
    if (targetElm.open) {
        targetElm.close()
    } else {
        //Set if dialog should be displayed as modal or non-modal
        isModal ? targetElm.showModal() : targetElm.show();
        //Focus parent element to handle light dismiss
        targetElm.focus();
    }

    //Handle light dismiss (close menu if focus is lost, e.g. tabbing away or click outside)
    if (isDismissable) {
        let lightDismiss = "data-light-dismiss";
        if (targetElm.hasAttribute(lightDismiss)) {
            return;
        } else {
            targetElm.addEventListener("focusout", (event) => {
                focusedOrHasFocused = targetElm.matches(':focus-within');
                if (!focusedOrHasFocused) {
                    targetElm.close()
                }
            });
            targetElm.addEventListener('click', function (e) {
                if (e.target === e.currentTarget) {
                    e.stopPropagation();
                    targetElm.close();
                }
            })
            targetElm.setAttribute(lightDismiss, "");
        }
    }
}

