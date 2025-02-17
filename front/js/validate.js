//const { console } = require("inspector");

const form = document.getElementById("registroForm");
const nombreInput = document.getElementById("nombre");
const apellidosInput = document.getElementById("apellidos");
const centroInput = document.getElementById("centro");
const emailInput = document.getElementById("email");
const passregister = document.getElementById("passregister");
const confirmpassregister = document.getElementById("confirmpassregister");
const register = document.getElementById("register"); 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
let errorEmail = document.getElementById("error-gmaildoesnotexist"); 
const formSolicitud = document.getElementById("solicitudForm");
const emailInputSolicitud = document.getElementById("solicitudEmail");
const emailErrorSolicitud = document.getElementById("error-email-solicitud");
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginRegister = document.getElementById('backToLoginRegister');
const backToLoginLink = document.getElementById("backToLoginLink");
import {getinforegister  , getUser , testlogin} from "./validateApis.js";


function showError(id) {
    document.getElementById(id).classList.remove("hidden");
    return false;
}

function hideErrors() {
    let errorElements = document.querySelectorAll(".text-red-500");
    errorElements.forEach(error => error.classList.add("hidden"));
}

let  validarRegister = async (event) =>{
    event.preventDefault();

    let nombre = nombreInput.value.trim();
    let apellidos = apellidosInput.value.trim();
    let centro = centroInput.value;
    let email = emailInput.value.trim();
    let password = passregister.value;
    let confirmPassword = confirmpassregister.value;

    hideErrors();

    if (nombre === "") return showError("error-nombre");
    if (apellidos === "") return showError("error-apellidos");
    if (centro === "Centro") return showError("error-centro");
    if (!emailRegex.test(email)) return showError("error-email");
    if (!passwordRegex.test(password)) return showError("error-password");
    if (password !== confirmPassword) return showError("error-confirm-password");

let data =  {
   email_param :  email , 
   nombre_param :  nombre , 
   apellidos_param :  apellidos , 
   centro_param :  centro , 
   password_param :  confirmPassword , 
}

let isregister   = await  getinforegister(data);
if (isregister) {
alert ("Usuario registrado correctamente !");
}else{
    showError("error-gmailexist");
   
}

   //form.submit();

}

let   validarSolicitud = async (event)=> {
    event.preventDefault();

    let email = emailInputSolicitud.value.trim();
    let gmail = await getUser(email);
    console.log(gmail)
    if (gmail){
        hideErrors();

        if (!emailRegex.test(email)) return showError("error-email-solicitud");
    
        alert ("Solicitud enviada con éxito");
        
    }else{

         showError("error-gmaildoesnotexist");
    }
  
    
}

//LISTENER
form.addEventListener("submit", validarRegister);
formSolicitud.addEventListener("submit", validarSolicitud);


const loginForm = document.getElementById("loginForm");
const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");

let  validarLoginFormulario = async (event)=> {
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
    let res = await testlogin(loginEmail , loginPassword);
   
if (!res) {
    
    showError("error-userdoesnotexist");
}else{
    sessionStorage.setItem("user-token", res);
    
    window.location.href = './pages/dashboard.html'; 
  
}


}

let backlogin = ()=>{
    registerContainer.setAttribute("class" , "hidden" )
    loginContainer.removeAttribute("class" , "hidden" )
    
    solicitudContainer.setAttribute("class" , "hidden" )
}
let backtopasswd = ()=>{
    registerContainer.setAttribute("class" , "hidden" )
    loginContainer.setAttribute("class" , "hidden" )
    
    solicitudContainer.removeAttribute("class" , "hidden" )
}

let backtoregister = ()=>{
    registerContainer.removeAttribute("class" , "hidden" )
    loginContainer.setAttribute("class" , "hidden" )
    
    solicitudContainer.setAttribute("class" , "hidden" )
}



backToLoginLink //login



backToLoginRegister.addEventListener("click" , backlogin)

forgotPasswordLink.addEventListener("click" , backtopasswd)

register.addEventListener("click" ,  backtoregister)
backToLoginLink.addEventListener("click" , backlogin)
loginForm.addEventListener("submit", validarLoginFormulario);