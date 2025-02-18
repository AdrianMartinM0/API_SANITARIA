const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const errorEmail = document.getElementById('error-login-email');
const errorPass = document.getElementById('error-login-password');
const errorLogin = document.getElementById('error-login');
const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[A-Za-z\d@$!%*?&]{8,36}$/;

const hideErrors = () => {
    errorEmail.classList.add("hidden");
    errorPass.classList.add("hidden");
    errorLogin.classList.add("hidden");
}

const validarLogin = async (event) => {
    event.preventDefault();
    hideErrors();
    let mail = loginEmail.value.trim();
    let pass = loginPassword.value.trim();
    if (!emailRgx.test(mail)) return errorEmail.classList.remove("hidden");
    if (!passwordRegex.test(pass)) return errorPass.classList.remove("hidden");

    const token = await logear(mail, pass);
    if(!token) return errorLogin.classList.remove("hidden");
    sessionStorage.setItem('user-token', token);
    window.location.href = "./pages/dashboard.html";
}

const logear = async (mail, pass) => {
    const response = await fetch(`http://localhost:3000/v1/usuario/login/${mail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password: pass
        })
    });
    const data = await response.json();
    return data.token;
}
//LISTENER
loginForm.addEventListener("submit", validarLogin);