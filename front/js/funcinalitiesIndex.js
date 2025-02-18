const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginLink = document.getElementById('backToLoginLink');
const loginContainer = document.getElementById('loginContainer');
const solicitudContainer = document.getElementById('solicitudContainer');
const register = document.getElementById('register');
const registerContainer = document.getElementById('registerContainer');
const backToLoginRegister =document.getElementById('backToLoginRegister');
const locks = document.querySelectorAll('.lock');

locks.forEach(lock => {
    lock.addEventListener('click', (event) => {
        const input = event.target.parentElement.parentElement.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    });
});

 // Mostrar formulario de solicitud de contraseña y ocultar el login
 forgotPasswordLink.addEventListener('click', () => {
    loginContainer.classList.add('d-none'); 
    solicitudContainer.classList.remove('d-none'); 
});

// Volver al formulario de login
backToLoginLink.addEventListener('click', () => {
    solicitudContainer.classList.add('d-none'); 
    loginContainer.classList.remove('d-none');
});

// Mostrar formulario de registro
register.addEventListener('click', () => {
    registerContainer.classList.remove('d-none');
    loginContainer.classList.add('d-none');
});

//Volver al formulario de login
backToLoginRegister.addEventListener('click', () => {
    registerContainer.classList.add('d-none');
    loginContainer.classList.remove('d-none');
});