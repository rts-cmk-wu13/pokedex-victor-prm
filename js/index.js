let allpokemon = [];
let maxPokeCount = 1025;
let rootElm = document.querySelector(".content-wrapper");
let headerElm = document.createElement("header");
headerElm.classList.add("header-index");
let mainElm = document.createElement("main");
mainElm.classList.add("standard-grid");

let loaderElm = document.createElement("div");
loaderElm.classList.add("popover-overlay", "fxrow", "hidden");
loaderElm.innerHTML = `<div class="loader"><img src="assets/svg/pokeball.svg" alt=""></div>`;

rootElm.append(headerElm, loaderElm, mainElm)
headerElm.innerHTML = createHeader();


function fetchPokemon() {
    documentIsLoading(true);

    let savedArray = getPokeArray();

    if (!savedArray) {
        const promises = [];
        for (let i = 1; i <= maxPokeCount; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
        Promise.all(promises).then((results) => {
            const pokemon = results.map((result) => ({
                name: result.name,
                /* image: result.sprites.other['official-artwork'].front_default, */
                /* type: result.types.map((type) => type.type[0].name), */
                type: result.types[0].type.name,
                id: result.id,
                searchID: padNumber(result.id)
            })).sort((a, b) => a.id > b.id ? 1 : -1);
            populateArray(pokemon);
            documentIsLoading(false);
        })
    } else {
        allpokemon = savedArray;
        sortPokemon();
        populateGrid();
        documentIsLoading(false);
    }
    const introduceTransitions = setTimeout(removeAnimationBlockers, 50);
};

/*     POPULATE ARRAY     */
function populateArray(pokeArray) {
    pokeArray.forEach((pokemon) => {
        allpokemon.push(pokemon);
    });
    populateGrid();
    storePokeArray(allpokemon);
}

let offset = 0;
/*     POPULATE/RENDER GRID     */
function populateGrid() {
    let increment = 96;
    //console.log(allpokemon)
    allpokemon.forEach((pokemon, i) => {
        if (i >= offset && i < offset + increment) {
            mainElm.innerHTML += createCard(pokemon);
        }
    });
    offset += increment;
    //console.log(offset)
    infinitScroll(mainElm);
    console.log("children:", mainElm.children.length)
}

function showLoader(bool) {
    let modifier = "hidden"
    bool ? loaderElm.classList.remove(modifier) : loaderElm.classList.add(modifier);
}

function trackLoadingStatus() {
    let bodyElm = document.body;
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "attributes") {

                let isLoading = mutation.target.getAttribute("data-loading");
                isLoading = (isLoading === 'true');

                if (isLoading) {
                    showLoader(true);
                } else {
                    showLoader(false);
                }
            }
        });
    });

    observer.observe(bodyElm, {
        attributes: true //configure it to listen to attribute changes
    });
}

function storePokeArray(pokeArray) {
    let storedArray = localStorage.getItem("pokemon");
    //console.log("Pokemon saved to Local Storage")
    !storedArray ? localStorage.setItem("pokemon", JSON.stringify(pokeArray)) : null;
}

function getPokeArray() {
    let storedArray = JSON.parse(localStorage.getItem("pokemon"));
    //console.log("Checking if poke array exists:", storedArray ? true: false)

    let size = new Blob(Object.values(localStorage)).size;
    let formatSize = `${(size / (Math.pow(1024, 2))).toFixed(2) + "MB"}`
    console.log("localstorage size:", formatSize);

    return storedArray ? storedArray : null;
}

function handleSearch(searchTerm) {
    //console.log(searchTerm)
    allpokemon = getPokeArray();
    if (searchTerm.length >= 2) {

        const fuseOptions = {
            // isCaseSensitive: false,
            includeScore: true,
            // ignoreDiacritics: false,
            shouldSort: false,
            // includeMatches: false,
            // findAllMatches: false,
            minMatchCharLength: 2,
            location: 0,
            threshold: 0.2,
            // distance: 100,
            // useExtendedSearch: false,
            // ignoreLocation: false,
            // ignoreFieldNorm: false,
            // fieldNormWeight: 1,
            keys: [
                "name",
                "type",
                "searchID"
            ]
        };

        const fuse = new Fuse(allpokemon, fuseOptions);

        // Change the pattern
        const searchPattern = searchTerm;

        let results = fuse.search(searchPattern);
        //console.log(results)

        if (results.length > 0) {
            allpokemon = results.map(result => result.item);
        }
    }

    //Clear main div from all cards
    resetGrid();   
}

trackLoadingStatus();
fetchPokemon();
