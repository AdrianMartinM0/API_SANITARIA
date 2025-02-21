const email = document.getElementById('solicitudEmail');
const form = document.getElementById('solicitudForm');
const error = document.getElementById('error-email-solicitud');
let notice;
// const success = document.getElementById('success-email-solicitud');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const recuperarPass = async (event) => {
    error.textContent = "";
    event.preventDefault();
    let mail = email.value.trim();

    if (!emailRegex.test(mail))
        return error.textContent = 'Formato del email no valido / campo email sin rellenar';

    const newPass = await generarNewPass(mail)
    if (newPass == false)
        return error.textContent = 'Ingresa un email registrado'
    generarCorreo(newPass, mail);

}

const generarNewPass = async (email) => {
    const response = await fetch(`http://localhost:3000/v1/usuario/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok)
        return false;
    const data = await response.json();
    return data;
}

const generarCorreo = (datos, email) => {
    var templateParams = {
        to_email: email,
        name: datos.name,
        pass: datos.password
    };
    emailjs.send("service_0x712po", "template_w3r2748", templateParams)
        .then(response => {
            notice.success("Contraseña cambiada con exito, porfavor compruebe el correo");
            setTimeout(() => {
                location.reload();
            }, 5000);
        })
        .catch(err => {
            error.textContent = 'Error Inesperado al enviar la nueva contraseña, porfavor intentelo de nuevo más tarde.';
        });
}

form.addEventListener('submit', recuperarPass);

document.addEventListener("DOMContentLoaded", function () {
    if (typeof AWN === "undefined") {
        console.error("Awesome Notifications no se ha cargado correctamente.");
    } else {
        console.log("Awesome Notifications cargado correctamente.");

        notice = new AWN();
    }
});