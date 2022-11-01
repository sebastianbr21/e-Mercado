function windowReplace(id){
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

const PRODUCT_INFO_URL1 = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("productID")}.json`;
const PRODUCT_INFO_COMMENTS_URL1 = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("productID")}.json`;

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        if (i == 0) {
            htmlContentToAppend += `
    <div class="carousel-item active">
      <img src="` + imageSrc + `"class="d-block w-100" alt="...">
    </div>
`
        } else {
            htmlContentToAppend += `
                    <div class="carousel-item ">
                      <img src="` + imageSrc + `"class="d-block w-100" alt="...">
                    </div>
                `
        }

        document.getElementById("carrousel-cat").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL1).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let productProductoHTML = document.getElementById("categoryProducto")

            productNameHTML.innerHTML = category.name;
            productCountHTML.innerHTML = category.soldCount;
            productDescriptionHTML.innerHTML = category.description;
            productCriteriaHTML.innerHTML = category.currency + " " + category.cost;
            productProductoHTML.innerHTML = category.category;

            showImagesGallery(category.images);
            
            getJSONData(PRODUCT_INFO_URL1).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    productInfo = resultObj.data;
                    let html = '';


                    for (i = 0; i < category.relatedProducts.length; i++) {
                        showRelatedProducts(productInfo.relatedProducts[i]);
                    }



                    function showRelatedProducts(productInfo) {
                        html += `
                        <div class="col-4 cursor-active col-12 col-md-6 col-lg-4 p-4" onclick="windowReplace(${productInfo.id})">
                        <br>
                        <div>
                          <img src="`+  productInfo.image +`" class="img-thumbnail">
                        </div>   
                          <h5>` + productInfo.name + `</h5>
                      </div>
                     `

                    }
                    document.getElementById("relacionado").innerHTML = html;
                }

            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL1).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;
            let userComments = "";


            for (i = 0; i < comments.length; i++) {
                let score = "";
                for (x = 1; x <= 5; x++) { 
                    if (x <= comments[i].score) {
                        score += "<i class='fas fa-star checked'></i>";
                    } else {
                        score += "<i class='far fa-star'></i>";
                    }
                }

                userComments += `<div> 
                         <hr>
                         <p> <strong>` + comments[i].user + `  </strong> `+ comments[i].dateTime +` <small>  ` + score + `</p> </small>
                         
                         <small><p>` + comments[i].description + `</p></small>
                         </div>`


                document.getElementById('comments').innerHTML = userComments;
            }

        }


    });
});





let commentObject = {
    "user": ["placeholder"],
    "comment": ["placeholder"],
    "score": ["placeholder"]
}
let titleInput = document.getElementById("title");
let messageBox = document.getElementById("display");
commentObject.user = localStorage.getItem("#email");


function storeComment(){
    comment = titleInput.value;
    commentObject.comment = comment;
    titleInput.value = "";
    messageBox.innerHTML= "";
    messageBox.innerHTML += `<div> <hr> <strong>` + commentObject.user + `</strong> <br> <small>` + commentObject.comment + ` <small><br> </div> `
}

