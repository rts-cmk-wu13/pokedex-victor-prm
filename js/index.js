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


function fetchPokemon(){
    documentIsLoading(true);

    let savedArray = getPokeArray();

    if(!savedArray){
        const promises = [];
        for (let i = 1; i <= maxPokeCount; i++) {
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
            populateArray(pokemon);
            documentIsLoading(false);
        })
    } else{
        allpokemon = savedArray;
        populateGrid();
        documentIsLoading(false);
    }
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
    let increment =  48;
    
    allpokemon.forEach((pokemon, i) => {
            if(i >= offset && i < offset+increment){
                mainElm.innerHTML += createCard(pokemon);
            }
    });
    offset += increment;
    //console.log(offset)
    infinitScroll(mainElm);
    console.log("children:",mainElm.children.length)
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

function storePokeArray(pokeArray){
    let storedArray = localStorage.getItem("pokemon");
    //console.log("Pokemon saved to Local Storage")
    !storedArray ? localStorage.setItem("pokemon",JSON.stringify(pokeArray)) : null;
}

function getPokeArray(){
    let storedArray = JSON.parse(localStorage.getItem("pokemon"));
    //console.log("Checking if poke array exists:", storedArray ? true: false)
    
    let size =  new Blob(Object.values(localStorage)).size;
    let formatSize = `${(size/(Math.pow(1024, 2))).toFixed(2)+"MB"}`
    console.log("localstorage size:", formatSize);

    return storedArray ? storedArray : null;
}

trackLoadingStatus();
fetchPokemon();