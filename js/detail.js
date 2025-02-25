const urlParams = new URLSearchParams(window.location.search);
const pokeID = urlParams.get('id');

let mainColor;

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
    let rootElm = document.querySelector(".detail-wrapper");
    let headerElm = document.createElement("header");
    headerElm.classList.add("header-detail");

    let mainElm = document.createElement("main");
    mainElm.classList.add("detail-card");

    headerElm.innerHTML = populateHeader(pokemon);
    mainElm.innerHTML = populateInfo(pokemon);

    rootElm.append(headerElm, mainElm);

    //Post append styles
    document.body.style.backgroundColor = mainColor;
    styleMeterPseudos(type)
}

function populateHeader(pokemon) {
    return `<div class="detail-top fxrow">
                <div class="detail-top__back-button">
                    <button class="header-button button-transparent" onclick="navigateToPage('index.html')"><img src="./assets/svg/arrow_back.svg" alt="Back arrow icon"></button>
                </div>
                <div class="detail-top__title">
                    <h1 class="detail-top__name capitalize">${pokemon.name}</h1>
                    <p class="detail-top__name-ja">${pokemon.name_ja}</p>
                </div>
                <p class="detail-top__number">#${padNumber(pokemon.id)}</p>
            </div>
            <div class="detail-watermark-container fxrow">
                <img class="detail-watermark" src="./assets/svg/pokeball.svg" alt="Pokeball watermark">
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
    return `<div class="detail-main fxcol">
                <section class="detail-main__types-container fxrow">
                   ${createTypePills(pokemon.types)}
                </section>
                ${createDetailSection("about", populateAboutSection(pokemon))}
                ${createDetailSection("base stats", populateStatsSection(pokemon.stats))}
            </div>`
}

function createDetailSection(title, content) {
    return `<section class="detail-section detail-section--${title} fxcol">
                <h2 class="detail-section__title detail-section__title--${title} capitalize" style="${setTypeColorText()}">${title}</h2>
                ${content ? content : ""}
            </section>`
}

function populateAboutSection(pokemon) {
    return `<div class="about-section fxcol">
                <div class="about-section__cards_container">
                    ${aboutCardIcon(pokemon.weight, "weight")}
                    ${horizontalDivider()}
                    ${aboutCardIcon(pokemon.height, "height")}
                    ${horizontalDivider()}
                    ${aboutCardList(pokemon.abilities, "abilities")}
                </div>
                <div class="about-section__text-container">
                    <p class="about-section__flavor-text capitalize">${pokemon.flavorText} </p>
                </div>
            </div>`

    function aboutCardIcon(value, label) {
        let unit = "";
        let src = "";
        let rotate = "";
        if (label == "weight") {
            unit = "kg";
            src = "./assets/svg/weight.svg";
        }
        if (label == "height") {
            unit = "m"
            src = "./assets/svg/straighten.svg";
            rotate = "rotate-90"
        }

        return `<div class="about-card">
                    <div class="about-card__content fxrow">
                        <div class="about-card__icon-container">
                            <img class="about-card__icon ${rotate}" src="${src}" alt="">
                        </div>
                        <p class="about-card__value" id="about-value">${convertUnit(value)}<span class="about-card__unit">${unit}</span></p>
                    </div>
                    <p class="about-card__label capitalize" for="about-value">${label}</p>
                </div>`
    }

    function aboutCardList(array, label) {

        function createAboutListItem(value) {
            return `<p class="about-card__value capitalize" id="about-value">${value}</p>`;
        }

        function createList() {
            return array.map(item => createAboutListItem(item.ability.name)).join("")
        }

        return `<div class="about-card">
                    <div class="about-card__content">
                        ${createList()}
                    </div>
                    <p class="about-card__label capitalize" for="about-value">${label}</p>
                </div>`
    }
}

function populateStatsSection(stats) {
    console.log(stats)

    function createStatsListItem(item) {
        let statName =  item.stat.name;
        let itemID = `stat-meter__${statName}`;
        let formattedName = statName.replaceAll("attack","atk").replaceAll("defense","def").replaceAll("special-","s").replaceAll("speed","spd").toUpperCase();
        //let calculatePercentage = () => Math.round((item.base_stat/255)*100);

        return  `<li class="stats-list-item">
                    <label class="stats-list-item__label" for="${itemID}" style="${setTypeColorText()}">${formattedName}</label>
                    ${horizontalDivider()}
                    <p class="stats-list-item__value">${item.base_stat}</p>
                    <meter class="stats-list-item__bar-graph" id="${itemID}" value="${item.base_stat}" max="255"></meter>
                </li>`
    }

    function createList(){
        return stats.map(item => createStatsListItem(item)).join("")
    }


    return `<div class="about-section fxcol">
                <ul class="about-section__stats-list">
                    ${createList()}
                </ul>
            </div>
            `
}

function createTypePills(pokeTypes) {
    let pills = pokeTypes.map(pokeType => createTypePill(pokeType.type.name)).join("");
    return pills;

    function createTypePill(pokeType) {
        return `<div class="pokemon-type-pill fxrow capitalize" style="${setTypeColorBG(pokeType)}">
                    <p class="pokemon-type-pill__text">${pokeType}</p>
                </div>`
    }
}

function horizontalDivider() {
    return `<div class="horizontal-divider"></div>`
}

function images() {
    `<img class="detail-image-pokemon" src="${pokemon.sprites.other['dream_world'].front_default}" alt="Image of the pokemon name ${pokemon.name}">
    <img class="detail-image-pokemon" src="${pokemon.sprites.other['home'].front_default}" alt="Image of the pokemon name ${pokemon.name}"></img>
    <img class="detail-main-image" src="${pokemon.sprites.other.showdown.front_default}" alt="">
    <img class="detail-main-image" src="${pokemon.sprites.other.showdown.back_default}" alt="">
    
    
    
    
    <div class="about-section__frontback fxrow">
                    <img class="about-section__front" src="${pokemon.sprites.other.showdown.front_default}" alt="">
                    <img class="about-section__front" src="${pokemon.sprites.other.showdown.back_default}" alt="">
    </div>
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

    return `<div class="detail-navigation-arrow detail-navigation-arrow--${cssModifier}">
                <button class="header-button button-transparent" onclick="navigateToPage('${link}')"><img src="${iconPath}" alt="${cssModifier} arrow icon"></button>
            </div>`
}

function setTypeColorBG(pokeType) {
    return `background-color: ${getCSScolor('--color-' + pokeType)}`;
}

function setTypeColorText() {
    return `color: ${mainColor}`;
}

function styleMeterPseudos(type) {
 
    const cssString = `
                    meter {
                        background: none; /* Required to get rid of the default background property */
                        background-color: color-mix(in srgb, var(--color-${type}) 20%, transparent);
                        height: var(--spacing-hlf);
                        border-radius: var(--spacing-dbl);
                        border: none;
                        box-shadow: inset var(--shadow-2dp);
                    }

                    ::-moz-meter-bar{
                        background: none; /* Required to get rid of the default background property */
                        background-color: var(--color-${type});
                        border-radius: var(--spacing-dbl);
                    }

                    ::-webkit-meter-inner-element, ::-webkit-meter-bar{
                        height: var(--spacing-hlf);
                    }

                    ::-webkit-meter-bar {
                        background: none; /* Required to get rid of the default background property */
                        background-color: color-mix(in srgb, var(--color-${type}) 20%, transparent);
                        border-radius: var(--spacing-dbl);
                    }

                    ::-webkit-meter-optimum-value {
                        background: none; /* Required to get rid of the default background property */
                        background-color: var(--color-${type});
                        border-radius: var(--spacing-dbl);
                    }
        `
 
    const styleTag = document.createElement("style");
 
    styleTag.innerHTML = cssString;
    document.head.insertAdjacentElement("beforeend", styleTag)
}


fetchPokeId();