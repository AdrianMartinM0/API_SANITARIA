const email = document.getElementById('solicitudEmail');
const form = document.getElementById('solicitudForm');


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const recuperarPass = async (event) => {
    event.preventDefault();
    let mail = email.value.trim();


    if (!emailRegex.test(mail))
        return;
    
    const newPass = await generarNewPass(mail)
    if(newPass.error)
        return;
    
    generarCorreo(newPass, mail);

}

const generarNewPass = async (email) => {
    const response = await fetch(`http://localhost:3000/v1/usuario/${email}`,{
        method:"PUT",
        headers: {"Content-Type" : "applcation/json"}
    });
    const data = await response.json();
    return data;
}

const generarCorreo = (datos, email) => {
    var templateParams = {
        to_email: email,
        name : datos.name,
        pass: datos.password
    };
    emailjs.send("service_0x712po", "template_w3r2748", templateParams)
    .then(function(response) {
        console.log('Correo enviado con éxito!', response.status, response.text);
    }, function(error) {
        console.log('Error al enviar el correo: ' + JSON.stringify(error));
    });
}

form.addEventListener('submit', recuperarPass);