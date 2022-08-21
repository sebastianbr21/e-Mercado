const CATAUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let currentCategoriesArray = [];

document.getElementById("products-tittle").innerHTML = `
        <h2>Productos</h2>
        <p class="lead">Verás aquí todos los productos de la categoría <strong>Autos</strong></p> `

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.products.length; i++){
        let product = currentCategoriesArray.products[i];

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 >${product.name} - ${product.currency} ${product.cost}</h4>
                            <small>${product.soldCount} vendidos</small>
                        </div>
                        <p>${product.description}</p>
                    </div>
                </div>
            </div>
            `
        document.getElementById("autos101").innerHTML = htmlContentToAppend;
    }
}
        
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CATAUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
        }
    });
});