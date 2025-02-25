const urlParams = new URLSearchParams(window.location.search);
const pokeID = urlParams.get('id');

let mainColor;

let rootElm = document.querySelector(".detail-wrapper");
let headerElm = document.createElement("header");
headerElm.classList.add("header-detail");
let mainElm = document.createElement("main");
mainElm.classList.add("detail-card");
rootElm.append(headerElm, mainElm);

function fetchPokeId() {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;

    fetch(url)
        .then(res => res.json())
        .then(pokemon => {
            // Start fetching the species data in parallel
            const speciesUrl = pokemon.species.url;
            return Promise.all([pokemon, fetch(speciesUrl).then(res => res.json())]);
        })
        .then(([pokemon, species]) => {
            // Now you have both pokemon and species data
            // Get the latest flavor text (in English)
            let lastIndex = species.flavor_text_entries.map(s => s.language.name === "en").lastIndexOf(true);
            let mostToDateText = species.flavor_text_entries[lastIndex].flavor_text;
            // Add the flavor text to the pokemon object (optional, but convenient)
            pokemon.flavorText = mostToDateText;

            //Get Japanse name too
            let japaneseIndex = species.names.map(s => s.language.name === "ja").lastIndexOf(true);
            let japaneseName = species.names[japaneseIndex].name;
            pokemon.name_ja = japaneseName;

            //Modify the title of document
            document.title += ` — #${padNumber(pokemon.id)}`;
            console.log(pokemon.id)

            // Now you can pass the combined data to your function
            populateDetail(pokemon);
        });
}


function populateDetail(pokemon) {
    console.log(pokemon)
    let type = pokemon.types[0].type.name;
    mainColor = getCSScolor(`--color-${type}`);

    headerElm.innerHTML = populateHeader(pokemon);
    mainElm.innerHTML = populateInfo(pokemon);

    //Post append styles
    document.body.style.backgroundColor = mainColor;
    styleMeterPseudos(mainColor)
}


fetchPokeId();