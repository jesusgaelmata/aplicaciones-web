// INICIO - datos curiosos
let btnDato = document.querySelector("#btnDato");

if (btnDato) {
    let datos = [
        "El olfato de un perro es hasta 40 veces mejor que el de nosotros.",
        "Los perros también sueñan cuando duermen.",
        "La nariz de cada perro es única, como una huella digital.",
        "Los perros sudan por las patas.",
        "Un perro puede aprender más de 100 palabras."
    ];

    btnDato.addEventListener("click", function () {
        let num = Math.floor(Math.random() * datos.length);
        document.querySelector("#dato").textContent = datos[num];
    });
}


// RAZAS - boton de ver mas
let botonesMas = document.querySelectorAll(".btn-mas");

botonesMas.forEach(function (boton) {
    boton.addEventListener("click", function () {
        let info = boton.nextElementSibling;
        info.classList.toggle("oculto");

        if (info.classList.contains("oculto")) {
            boton.textContent = "Ver más";
        } else {
            boton.textContent = "Ver menos";
        }
    });
});


// GALERIA - ver la foto en grande
let fotos = document.querySelectorAll(".foto");
let modalFoto = document.querySelector("#modalFoto");

if (modalFoto) {
    let modal = new bootstrap.Modal(modalFoto);

    fotos.forEach(function (foto) {
        foto.addEventListener("click", function () {
            document.querySelector("#fotoGrande").src = foto.src;
            document.querySelector("#fotoGrande").alt = foto.alt;
            document.querySelector("#nombreFoto").textContent = foto.alt;
            modal.show();
        });
    });
}


// CONTACTO - validar el formulario
let formulario = document.querySelector("#formulario");

// pone el campo en rojo y muestra su mensaje de error
function mostrarError(campo, idError) {
    campo.classList.add("is-invalid");
    document.querySelector(idError).classList.remove("oculto");
}

// quita el rojo y esconde el mensaje de error
function quitarError(campo, idError) {
    campo.classList.remove("is-invalid");
    document.querySelector(idError).classList.add("oculto");
}

if (formulario) {

    // si ya mando un mensaje antes, lo saludamos con el nombre guardado
    let nombreGuardado = localStorage.getItem("nombre");

    if (nombreGuardado != null) {
        document.querySelector("#saludo").textContent = "Hola de nuevo, " + nombreGuardado + ".";
        document.querySelector("#saludo").classList.remove("oculto");
        document.querySelector("#nombre").value = nombreGuardado;
    }

    formulario.addEventListener("submit", function (e) {
        // para que la pagina no se recargue
        e.preventDefault();

        let nombre = document.querySelector("#nombre");
        let apellidos = document.querySelector("#apellidos");
        let correo = document.querySelector("#correo");
        let telefono = document.querySelector("#telefono");
        let raza = document.querySelector("#raza");
        let motivo = document.querySelector("#motivo");
        let mensaje = document.querySelector("#mensaje");
        let noticias = document.querySelector("#noticias");
        let acepto = document.querySelector("#acepto");
        let perro = document.querySelector("input[name='perro']:checked");

        let hayErrores = false;

        // checkValidity() revisa lo que pusimos en el HTML (required, minlength, pattern, type="email")
        if (nombre.checkValidity() == false) {
            mostrarError(nombre, "#errorNombre");
            hayErrores = true;
        } else {
            quitarError(nombre, "#errorNombre");
        }

        if (apellidos.checkValidity() == false) {
            mostrarError(apellidos, "#errorApellidos");
            hayErrores = true;
        } else {
            quitarError(apellidos, "#errorApellidos");
        }

        if (correo.checkValidity() == false) {
            mostrarError(correo, "#errorCorreo");
            hayErrores = true;
        } else {
            quitarError(correo, "#errorCorreo");
        }

        if (telefono.checkValidity() == false) {
            mostrarError(telefono, "#errorTelefono");
            hayErrores = true;
        } else {
            quitarError(telefono, "#errorTelefono");
        }

        if (perro == null) {
            document.querySelector("#errorPerro").classList.remove("oculto");
            hayErrores = true;
        } else {
            document.querySelector("#errorPerro").classList.add("oculto");
        }

        if (motivo.checkValidity() == false) {
            mostrarError(motivo, "#errorMotivo");
            hayErrores = true;
        } else {
            quitarError(motivo, "#errorMotivo");
        }

        if (mensaje.checkValidity() == false) {
            mostrarError(mensaje, "#errorMensaje");
            hayErrores = true;
        } else {
            quitarError(mensaje, "#errorMensaje");
        }

        if (acepto.checked == false) {
            mostrarError(acepto, "#errorAcepto");
            hayErrores = true;
        } else {
            quitarError(acepto, "#errorAcepto");
        }

        // si algo esta mal mostramos una alerta y no seguimos
        if (hayErrores == true) {
            Swal.fire({
                title: "Faltan datos",
                text: "Revisa los campos que están en rojo.",
                icon: "error",
                confirmButtonColor: "#1F2937"
            });
            return;
        }

        let textoNoticias = "No";
        if (noticias.checked == true) {
            textoNoticias = "Sí";
        }

        // mostramos lo que se envio abajo del formulario
        let resumen = document.querySelector("#resumen");
        resumen.innerHTML =
            "<h2 class='h5'>Datos enviados</h2>" +
            "<p class='mb-0'>Nombre: " + nombre.value + " " + apellidos.value + "<br>" +
            "Correo: " + correo.value + "<br>" +
            "Teléfono: " + telefono.value + "<br>" +
            "¿Tiene perro?: " + perro.value + "<br>" +
            "Raza favorita: " + raza.value + "<br>" +
            "Motivo: " + motivo.value + "<br>" +
            "Quiere noticias: " + textoNoticias + "</p>";
        resumen.classList.remove("oculto");

        // guardamos el nombre para saludarlo la proxima vez
        localStorage.setItem("nombre", nombre.value);

        Swal.fire({
            title: "¡Enviado!",
            text: "Gracias " + nombre.value + ", te contestamos pronto.",
            icon: "success",
            confirmButtonColor: "#1F2937"
        });

        formulario.reset();
    });
}
