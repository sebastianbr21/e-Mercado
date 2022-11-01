let SUCCESS_MSG = "¡Se ha realizado la compra con éxito!";
let ERROR_MSG = "Ha habido un error, verifica qué pasó.";
const CART_INFO_URL1 = 'https://japceibal.github.io/emercado-api/user_cart/25801.json'

let cartArray = [];
showSpinner();

function showCartList(array) {

    let htmlContentToAppend = "";
    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            let prodct = array[i];


            htmlContentToAppend += `
                        <tr>
                            <td><img height="50" src="` + prodct.image + `" /> </td>
                            <td>` + prodct.name + `</td>
                            <td id="productCostText">` + prodct.unitCost + ' ' + prodct.currency + `</td>
                            <td><input id="envio` + i + `" type="number" onchange="subproductCosttoHTML(); getData();"  min="1" value=` + prodct.count + `></input></td>
                            <td class="text-right"><span class="subcostOfProduct"></span> ` + ' ' + prodct.currency + ` </td>
                            <td class="text-right"><button id="delete-button" class="btn btn-sm btn-danger" onclick="deleteProduct(` + i + `);"><i class="fa fa-trash"></i> </button> </td>
                            </tr>
                            
    `
        }
    } else {
        htmlContentToAppend += `<td class="text-center" colspan="5"><h5><strong>El carrito está vacío<strong><h5><td>`;
    }



    document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
    hideSpinner();
    subproductCosttoHTML();
    totalOfCosts();
}



function subproductCosttoHTML() {
    let unitCostProduct = 0;
    let numberOfSelectedProducts = 0;
    if (cartArray.length > 0) {

        for (let i = 0; i < cartArray.length; i++) {
            unitCostProduct = parseInt(cartArray[i].unitCost);
            numberOfSelectedProducts = document.getElementById("envio" + i).value;
            localStorage.setItem("cantidad", numberOfSelectedProducts)
        }

        subcost = unitCostProduct * numberOfSelectedProducts;


        document.querySelector(".subcostOfProduct").innerHTML = subcost;


        let e = document.getElementById("shipping");
        let value = e.options[e.selectedIndex].value;

        shippingprice = value * subcost;
        document.querySelector("#showShipping").innerHTML = shippingprice;
        totalOfCosts();
        let typeOfShipping = e.options[e.selectedIndex].text;
        localStorage.setItem("envio", typeOfShipping);
    }
};

function totalOfCosts() {
    if (cartArray.length > 0) {
        totalCost = shippingprice + subcost;
        document.querySelector("#totalCost").innerHTML = totalCost
    }
}

function deleteProduct(index) {
    cartArray.splice(index, 1);
    showCartList(cartArray);
    let shipRow = document.getElementById("ship-row");
    shipRow.remove();
    let ctRow = document.getElementById("ct-row");
    ctRow.remove();
}




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL1).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles;
            showCartList(cartArray);
        }
    });
});



(function  validacion() {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

let creditCardCheck = false;
let bankTranferCheck = false;

document.getElementById("creditCard").addEventListener("click", () =>{

    document.getElementById("terminos_aceptados").innerHTML = 'Tarjeta de credito';
    document.getElementById("fieldset").disabled = false;
    document.getElementById("accountnumber").disabled = true;
    document.getElementById("failedPayMethod").innerHTML = ""; 
    creditCardCheck = true;
  });

document.getElementById("bankTranfer").addEventListener("click", () =>{

    document.getElementById("terminos_aceptados").innerHTML = 'Transferencia bancaria';
    document.getElementById("fieldset").disabled = true;
    document.getElementById("accountnumber").disabled = false;
    document.getElementById("failedPayMethod").innerHTML = "";
    bankTranferCheck = true;
  });




function metodPay(){

    let inputAddress = document.getElementById("inputAddress").value;
    let inputAddressNum = document.getElementById("inputAddressNum").value;
    let inputAddress2 = document.getElementById("inputAddress2").value;
    let envio = document.getElementById('envio0').value;

    if (!creditCardCheck == true && !bankTranferCheck == true) {
        document.getElementById("failedPayMethod").innerHTML = "Debe selecionar un metodo de pago.";
        console.log(bankTranferCheck);
        console.log(creditCardCheck);
    }else if (!inputAddress == "" && !inputAddressNum == "" && !inputAddress2 == "") {
        document.getElementById("failedPayMethod").innerHTML = "";
        document.getElementById('prueba').innerHTML = `<div class="alert alert-success alert-dismissible fade show" set role="alert">
        <h4 class="alert-heading">Bien hecho</h4>
        <p>Su compra ha sido procesada con exito.</p>
      </div>'`
        }
}









