const formRegister = document.getElementById("registroForm");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const centro = document.getElementById("centro");
const emailRegister = document.getElementById("email");
const password = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("registerPassword2");
const errorRegister = document.getElementById("error-register");
const errorMail = document.getElementById("error-email");
const errorPassRegister = document.getElementById("error-password");
const errorPass2 = document.getElementById("error-confirm-password");
const mailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^[A-Za-z\d@$!%*?&]{8,36}$/;
let notifier;

const hideError = () => {
    errorRegister.classList.add("hidden");
    errorMail.classList.add("hidden");
    errorPassRegister.classList.add("hidden");
    errorPass2.classList.add("hidden");
}

const validarRegister = async (event) => {
    event.preventDefault();
    hideError();
    if (!nombre.value || !apellidos.value || !centro.value || !emailRegister.value || !password.value || !confirmPassword.value) 
        return errorRegister.classList.remove('hidden');
    if(!mailRgx.test(emailRegister.value)) return errorMail.classList.remove('hidden');
    if(!passRegex.test(password.value)) return errorPassRegister.classList.remove('hidden');
    if(password.value != confirmPassword.value) return errorPass2.classList.remove('hidden');

    const data = {
        nombre: nombre.value,
        apellidos: apellidos.value,
        centro: centro.value,
        email: emailRegister.value,
        password: password.value,
    }
    notifier.success("Registro completado con exito");
    await registrar(data);
    
}

const registrar = async (datos) => {
    const response = await fetch(`http://localhost:3000/v1/usuario/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });
    const data = await response.json();
    if(response.status == 400){
        errorRegister.textContent = data.details
        return errorRegister.classList.remove('hidden');
    }
    if(response.status == 500){
        errorRegister.textContent = 'Error inesperado, por favor intente registrase en otro momento';
        return errorRegister.classList.remove('hidden');
    }
    
    log(datos.email, datos.password);
    
}

const log = async (mail, pass) => {
    const response = await fetch(`http://localhost:3000/v1/usuario/login/${mail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password: pass
        })
    });
    const data = await response.json();
    sessionStorage.setItem('user-token', data.token);
    window.location.href = "./pages/dashboard.html";
}

document.addEventListener("DOMContentLoaded", function () {
    if (typeof AWN === "undefined") {
        console.error("Awesome Notifications no se ha cargado correctamente.");
    } else {
        console.log("Awesome Notifications cargado correctamente.");
        
        notifier = new AWN();
    }
  });

formRegister.addEventListener('submit', validarRegister);