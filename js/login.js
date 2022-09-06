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

























//   prueba  //

/*function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "589550218779-8gtta52f0t6teka1e58g48mlu2krqsa9.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "filled_blue", size: "large" }
    );
    google.accounts.id.prompt();
  }*/