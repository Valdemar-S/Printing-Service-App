const priceElem = document.getElementById("price");
const basePriceElem = document.getElementById("basePrice");
const widthElem = document.getElementById("width");
const heightElem = document.getElementById("height");
const countElem = document.getElementById("count");

let materialPriceMultipliers;

loadMaterialPrices();

function loadMaterialPrices() {
    const xhr = new XMLHttpRequest();
    const title = document.title;
    if (title === 'Poster') {
        xhr.open('GET', '/materials/poster', true);
    } else {
        xhr.open('GET', '/materials/sticker', true);
    }
    xhr.send();

    xhr.onload = function () {
        materialPriceMultipliers = JSON.parse(xhr.responseText);
    };
}

function recalculatePrice() {

    const width = parseFloat(widthElem.value);
    const height = parseFloat(heightElem.value);
    const count = parseInt(countElem.value);

    if (!isNaN(width) && !isNaN(height) && !isNaN(count)) {
        const select = document.getElementById("materialId");
        const selectedValue = select.options[select.selectedIndex].value;

        const basePrice = width * height * 0.1;
        basePriceElem.value = basePrice.toFixed(2);

        const multiplier = materialPriceMultipliers[selectedValue];
        priceElem.innerHTML = ((basePrice + (basePrice * multiplier)) * count).toFixed(2);
    }

}