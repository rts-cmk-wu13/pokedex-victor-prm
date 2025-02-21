const urlParams = new URLSearchParams(window.location.search);
const pokeID = urlParams.get('id');

const url = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
fetch(url).then(res => res.json()).then(pokemon => populateDetail(pokemon));


function populateDetail(pokemon) {
    console.log(pokemon)
    let type = pokemon.types[0].type.name;
    let rootElm = document.querySelector(".detail-wrapper");
    rootElm.setAttribute("onmouseover",`colorBackground(this,'${type}')`)
    let headerElm = document.createElement("header");
    headerElm.classList.add("header-detail");
    let mainElm = document.createElement("main");
    mainElm.classList.add("detail-card");

    rootElm.innerHTML = "Hello"

    rootElm.append(headerElm, mainElm);
   

   
}

function colorBackground(elm, type){
    console.log(elm)
    let color = `var(--color-${type})`; console.log(color)
    elm.style.backgroundColor = color;
}