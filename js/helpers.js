function colorBackgroundType(selector, type) {
    selector.removeEventListener("mouseout", backToNormal);

    let color = `color-mix(in srgb, ${getCSScolor('--color-' + type)} 10%, transparent)`;
    selector.closest("div").style.backgroundColor = color;
    selector.addEventListener("mouseout", backToNormal);

    function backToNormal() {
        selector.closest("div").style.backgroundColor = 'var(--gray-950)';
    }
}

function getCSScolor(varName) {
    const root = document.documentElement;
    const currentColor = getComputedStyle(root).getPropertyValue(varName);
    return currentColor;
}

function clearSearchBar(id) {
    document.querySelector("#" + id).value = "";
}

function linkToID(id) {
    let redirect = `./detail.html?id=${id}`;
    return redirect;
}

function padNumber(number,padAmount) {
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
function sortPokemon(thisElement) {
    let eles = thisElement.getElementsByTagName('input');
    let currentSelection;

    //Find the current value of the radio button group
    for (i = 0; i < eles.length; i++) {
        if (eles[i].type = "radio")
            if (eles[i].checked) {
                currentSelection = eles[i].value;
            }
    }

    if (currentSelection == "NUMBER") {
        sortByID();
    } else {
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

function performSort(t) {
    //Clear main div from all cards
    mainElm.innerHTML = "";
    offset = 0;
    //Hide the menu
    toggleMenu('dropdown-menu-sort', 1, 1);

    //Show Loader and start sorting
    documentIsLoading(true);
    const myTimeout = setTimeout(() => sortPokemon(t), 5);
}

function documentIsLoading(bool) {
    let bodyElm = document.body;
    bodyElm.setAttribute('data-loading', bool);
}


function infinitScroll(targetParentElm){
    let triggerElm = ".pokemon-card:nth-last-child(12)";
    const targetElm = targetParentElm.querySelector(triggerElm);
    targetElm.style.backgroundColor = "red";
    console.log(targetElm)
    
    const options = {
        threshold: 1
    };
    
    const observer = new IntersectionObserver(function checkVisibility(entries){
        entries.forEach(entry => {
            if(entry.isIntersecting){
                console.log(offset)
                if(offset < 1304){
                    populateGrid();
                    observer.unobserve(targetElm);
                }
                
            }
        });
    }, options)

   
    observer.observe(targetElm);
}

