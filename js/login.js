let parrafo = document.getElementsByClassName(".alert-emply");
let btn = document.getElementById('btn');

// Generamos un evento el cual ejecuta las validaciones para redirigirnos a la pagina principal y guardar el mail del usuario en el local storage
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
// Realizamos una validacion de campos donde definimos el largo de la contraseña y la estructura del mail.
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
