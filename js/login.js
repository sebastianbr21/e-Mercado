var parrafo = document.getElementsByClassName(".alert-emply");
var btn = document.getElementById('btn');


btn.addEventListener("click", (e) => {
    e.preventDefault();
    validate();
    let condicion = validate()
    if (condicion) {
        location.href = "index.html";
    }
    let elemento = document.querySelector('#email');
    localStorage.setItem('#email', elemento.value);

})

function validate() {
    condicion = true;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if(!regexEmail.test(email.value)){
        let elemento = document.querySelector('#email');
        elemento.lastElementChild.innerHTML = "Ingresa tu e-mail";
        condicion = false;
    }

    if (pass.value.length < 6 || pass.value.trim() == " "){
        let elemento = document.querySelector(".pass");
        elemento.lastElementChild.innerHTML = "Ingresa tu contraseña";
        condicion = false;
    }
    
    return condicion

}
