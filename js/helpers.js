function colorBackgroundType(selector, type) {
    selector.removeEventListener("mouseout", backToNormal);

    let color = `color-mix(in srgb, ${getCSScolor('--color-' + type)} 10%, transparent)`;
    selector.closest("div").style.backgroundColor = color;
    selector.addEventListener("mouseout", backToNormal);

    function backToNormal() {
        selector.closest("div").style.backgroundColor = 'var(--gray-900)';
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

function padNumber(id) {
    let paddedNum = String(id).padStart(3, '0');
    return paddedNum
}

function navigateToPage(page) {
    console.log(page)
    document.location.href = page;
}

function convertUnit(value){
    //Height and weight values from the API is measured in decimeters/dekagrams, so here we convert to meters
    return value/10;
}