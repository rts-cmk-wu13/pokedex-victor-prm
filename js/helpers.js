function cardHoverAnimation(elementClass, type) {
    let selector = document.querySelector(`.pokemon-card__hidden-link--${elementClass}`);
    selector.removeEventListener("mouseout", backToNormal);

    //Get elements
    let cardElm = selector.closest('.pokemon-card');
    let overlayElm = selector.closest('.pokemon-card__overlay');
    let imgElm = document.querySelector(`.pokemon-card__image--${elementClass}`)

    let initialColorBG = overlayElm.style.backgroundColor;
    let initialColorBorder = cardElm.style.borderColor;
    let initialImgWidth = imgElm.style.width;

    //Set hover colors
    let typeColor = getCSScolor('--color-' + type);
    let bgColor = `color-mix(in srgb, ${typeColor} 20%, transparent)`;

    //Style the elements according to hover
    overlayElm.style.backgroundColor = bgColor;
    cardElm.style.borderColor = typeColor;
    imgElm.style.width = "70%";

    selector.addEventListener("mouseout", backToNormal);

    //Reset style on mouse leave
    function backToNormal() {
        overlayElm.style.backgroundColor = initialColorBG;
        cardElm.style.borderColor = initialColorBorder;
        imgElm.style.width = initialImgWidth;
    }
}

function getCSScolor(varName) {
    const root = document.documentElement;
    const currentColor = getComputedStyle(root).getPropertyValue(varName);
    return currentColor;
}

function clearSearchBar(id) {
    document.querySelector("#" + id).value = "";
    debounceInput(document.querySelector("#" + id).value);
}

function linkToID(id) {
    let redirect = `./detail.html?id=${id}`;
    return redirect;
}

function padNumber(number, padAmount) {
    let value = padAmount ? padAmount : 3;
    let paddedNum = String(number).padStart(value, '0');
    return paddedNum
}

function navigateToPage(page) {
    console.log(page)
    document.location.href = page;
}

function convertUnit(value) {
    //Height and weight values from the API is measured in decimeters/dekagrams, so here we convert to meters
    return value / 10;
}
/*     SORT ARRAYS     */

function sortPokemon() {
    let sortButtonIconElm = document.querySelector(".sort-button-icon");
    let currentSelection = localStorage.getItem('sort_preference') || "NUMBER";

    if (currentSelection == "NUMBER") {
        sortButtonIconElm.src = "./assets/svg/tag.svg"
        sortByID();
    } else {
        sortButtonIconElm.src = "./assets/svg/text_format.svg"
        sortByName();
    }

    //Repopulate the grid
    populateGrid();
    documentIsLoading(false);
    //Sort functions
    function sortByID() {
        allpokemon = allpokemon.sort((a, b) => a.id > b.id ? 1 : -1);
    }

    function sortByName() {
        allpokemon = allpokemon.sort((a, b) => a.name > b.name ? 1 : -1);
    }
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const debounceInput = debounce((val) => handleSearch(val));

//Maybe use this instead of fuzzy search?
function manualSearch(val) {
    let tempArr = allpokemon.filter(item => item.name.includes(val) || String(item.id).includes(val) || item.type.includes(val))
    console.log(tempArr);
}

function setSortPreference(v) { localStorage.setItem("sort_preference", v) };

function performSort(t) {
    resetGrid();
    //Hide the menu
    toggleMenu('dropdown-menu-sort', 1, 1);

    //Show Loader and start sorting
    documentIsLoading(true);
    const myTimeout = setTimeout(() => sortPokemon(), 5);
}

function documentIsLoading(bool) {
    let bodyElm = document.body;
    bodyElm.setAttribute('data-loading', bool);
}

function removeAnimationBlockers() {
    document.body.removeAttribute("class");
}

function resetGrid() {
    //Clear main div from all cards
    mainElm.innerHTML = "";
    offset = 0;
    sortPokemon();
}

function setStylePreference(value) {
    let preference = value ? "3d" : "2d";
    localStorage.setItem("style_preference", preference);

    let text2dElm = document.querySelector(".search-bar__toggle-switch-text--2d");
    let text3dElm = document.querySelector(".search-bar__toggle-switch-text--3d");

    if (value == true) {
        text2dElm.classList.remove("search-bar__toggle-switch-text--selected");
        text3dElm.classList.add("search-bar__toggle-switch-text--selected");
    } else {
        text2dElm.classList.add("search-bar__toggle-switch-text--selected");
        text3dElm.classList.remove("search-bar__toggle-switch-text--selected");
    }

    resetGrid();
}

function handleStylePreference(pokeData){
    let imgSource;
    let userStylePreference = localStorage.getItem('style_preference') || "2d";
    //Make an if-statement here later
    if(userStylePreference === "3d"){
        userStylePreference = "home";
    }else{
        userStylePreference = "official-artwork";
    }

    imgSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/${userStylePreference}/${pokeData.id}.png`
    return imgSource;
}

function imageFadeIn(elm){
    elm.classList.add("img-loaded")
}


function infiniteScroll(targetParentElm) {
    let itemsInGrid = mainElm.children.length;
    let itemThreshold = 24
    if (itemsInGrid >= itemThreshold) {
        let triggerElm = `.pokemon-card:nth-last-child(${itemThreshold})`;
        const targetElm = targetParentElm.querySelector(triggerElm);
        //targetElm.style.backgroundColor = "red";

        const options = {
            threshold: 1
        };

        const observer = new IntersectionObserver(function checkVisibility(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    //console.log(offset)
                    if (offset <= maxPokeCount) {
                        populateGrid();
                        observer.unobserve(targetElm);
                    }

                }
            });
        }, options)


        observer.observe(targetElm);
    }
}

