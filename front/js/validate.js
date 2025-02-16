const form = document.getElementById("registroForm");
const nombreInput = document.getElementById("nombre");
const apellidosInput = document.getElementById("apellidos");
const centroInput = document.getElementById("centro");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

const formSolicitud = document.getElementById("solicitudForm");
const emailInputSolicitud = document.getElementById("solicitudEmail");
const emailErrorSolicitud = document.getElementById("error-email-solicitud");

function showError(id) {
    document.getElementById(id).classList.remove("hidden");
    return false;
}

function hideErrors() {
    let errorElements = document.querySelectorAll(".text-red-500");
    errorElements.forEach(error => error.classList.add("hidden"));
}

function validarRegister(event) {
    event.preventDefault();

    let nombre = nombreInput.value.trim();
    let apellidos = apellidosInput.value.trim();
    let centro = centroInput.value;
    let email = emailInput.value.trim();
    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    hideErrors();

    if (nombre === "") return showError("error-nombre");
    if (apellidos === "") return showError("error-apellidos");
    if (centro === "Centro") return showError("error-centro");
    if (!emailRegex.test(email)) return showError("error-email");
    if (!passwordRegex.test(password)) return showError("error-password");
    if (password !== confirmPassword) return showError("error-confirm-password");

    alert ("Solicitud enviada con éxito");
    // form.submit();
}

function validarSolicitud(event) {
    event.preventDefault();

    let email = emailInputSolicitud.value.trim();

    hideErrors();

    if (!emailRegex.test(email)) return showError("error-email-solicitud");

    alert ("Solicitud enviada con éxito");
    // formSolicitud.submit();
}

//LISTENER
form.addEventListener("submit", validarRegister);
formSolicitud.addEventListener("submit", validarSolicitud);


const loginForm = document.getElementById("loginForm");
const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");

function validarLoginFormulario(event) {
    event.preventDefault();

    let loginEmail = loginEmailInput.value.trim();
    let loginPassword = loginPasswordInput.value.trim();

    hideErrors();

    if (!emailRegex.test(loginEmail)) {
        return showError("error-login-email");
    }

    if (!passwordRegex.test(loginPassword)) {
        return showError("error-login-password");
    }

    
}
let getloginendpoint  = async (email)=>{
    let info = await fetch(`localhost:3000/v1/usuario/login/${email}`)
.then((data) => data);
return info;
}

let getLoginEndpoint = async (email, passwd) => {
    let data = await fetch(`http://localhost:3000/v1/usuario/login/${email}?password=${encodeURIComponent(passwd)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    let text = await data.text();
    return {
        status: data.status,
        text: text
    };
};

// Uso de la función:
getLoginEndpoint("lo1l@gmail.com", "Puesto70**").then(data => {
    console.log(data.status); // Estado de la respuesta (200, 404, etc.)
    console.log(data.text); // Texto de la respuesta
});















let textlogin = (email , passwd)=>{

}


loginForm.addEventListener("submit", validarLoginFormulario);







