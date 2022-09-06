const searchBar = document.getElementById('searchBar');

let currentProductsArray = [];
let categoryName = null;

const ORDER_ASC_BY_COST = "0-9";
const ORDER_DESC_BY_COST = "9-0";
const ORDER_BY_PROD_SOLDCOUNT = "Rel";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("contenido-categories").innerHTML = htmlContentToAppend;
    }

    document.getElementById("products-tittle").innerHTML = `
        <h2>Productos</h2>
        <p class="lead">Verás aquí todos los productos de la categoría <strong>${categoryName}</strong></p>
        `
}

function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}

document.addEventListener("DOMContentLoaded", function(e){

    let id = localStorage.catID;
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/"+id+".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data;
            categoryName = currentProductsArray.catName;
            currentProductsArray = currentProductsArray.products;
            currentProductsArray_main = resultObj.data;
            currentProductsArray_main = currentProductsArray_main.products;
            showProductsList();
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });
    
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
    
        minCount = undefined;
        maxCount = undefined;
    
        showProductsList();
    });
   
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
      
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});

function busq() {
    let barra = document.getElementById('searchBar')
    currentProductsArray = currentProductsArray_main.slice();
    let arrayVacio = [];
    arrayvacio = currentProductsArray;
    const searchString = barra.value.toLowerCase();
    console.log(searchString)
    let filtro = currentProductsArray.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchString) || product.description.toLowerCase().includes(searchString)
        );
    });
    if (searchString.length == 0) {
        currentProductsArray = arrayVacio;
        showProductsList();
    } else {
        currentProductsArray = filtro;
        showProductsList();
    }
 
}