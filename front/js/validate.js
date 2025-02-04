const form = document.getElementById("registroForm");
const nombreInput = document.getElementById("nombre");
const apellidosInput = document.getElementById("apellidos");
const centroInput = document.getElementById("centro");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).{8,16}$/;

function showError(id) {
    document.getElementById(id).classList.remove("hidden");
    return false;
}

function hideErrors() {
    let errorElements = document.querySelectorAll(".text-red-500");
    errorElements.forEach(error => error.classList.add("hidden"));
}

function validarFormulario(event) {
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

    form.submit();
}

form.addEventListener("submit", validarFormulario);


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

    if (loginPassword === "") {
        return showError("error-login-password");
    }

    loginForm.submit();
}

loginForm.addEventListener("submit", validarLoginFormulario);


