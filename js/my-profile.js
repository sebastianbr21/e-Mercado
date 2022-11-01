document.getElementById('email').value = localStorage.getItem('#email')

//función que obtiene y almacena los datos de los campos y la imagen subida en un objeto
function register(nombre, apellido, email, segundonombre, segundoapellido, telefono) { //función que guarda los datos puestos en usuario y contraseña
    if (nombre.trim() === "" || apellido.trim() === "" || email.trim() === "") { //checkea que no haya campos en blanco
        Swal.fire({
            icon: 'error',
            title: 'Debes rellenar tus datos',
            text: 'Debe tener Nombre, Apellido y Email.',
          }) //sino envía una alerta
    } else {
        localStorage.setItem("nombre", nombre.trim()); //guarda los datos de en localStorage
        localStorage.setItem("segundonombre", segundonombre.trim());
        localStorage.setItem("apellido", apellido.trim());
        localStorage.setItem("segundoapellido", segundoapellido.trim());
        localStorage.setItem("email", email.trim());
        localStorage.setItem("telefono", telefono.trim());
        localStorage.setItem("myImg", myImg.src.trim());
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tus datos han sido guardados',
            showConfirmButton: false,
            timer: 1500,
            onClose: () => {location.reload()}
          })
    }
}



//funcion que modifica los valores de los input y la imagen para que aparezcan los datos guardados
if (localStorage.nombre != null ) {
    let name = localStorage.getItem("nombre");
    document.getElementById("nombre").innerHTML = name;
    nombre.value = name;
    let secondname = localStorage.getItem("segundonombre");
    document.getElementById("segundonombre").innerHTML = secondname;
    segundonombre.value = secondname;
    let surname = localStorage.getItem("apellido");
    document.getElementById("apellido").innerHTML = surname;
    apellido.value = surname;
    let surname2 = localStorage.getItem("segundoapellido");
    document.getElementById("segundoapellido").innerHTML = surname2;
    segundoapellido.value = surname2;
    let mail = localStorage.getItem("email");
    document.getElementById("email").innerHTML = mail;
    email.value = mail;
    let phone = localStorage.getItem("telefono");
    document.getElementById("telefono").innerHTML = phone;
    telefono.value = phone;
    let imgSrc = localStorage.getItem("myImg");
    document.getElementById("myImg").innerHTML = "imgSrc";
    myImg.src = imgSrc;
}

function importFileandPreview() {
    let preview = document.getElementById('myImg');
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();
  
    reader.addEventListener("load", function () {
      preview.src = reader.result;
      localStorage.setItem("myImg", (reader.result));
    });
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  