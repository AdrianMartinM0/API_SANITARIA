document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos por su ID
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLoginLink = document.getElementById('backToLoginLink');
    const loginContainer = document.getElementById('loginContainer');
    const solicitudContainer = document.getElementById('solicitudContainer');
    const register = document.getElementById('register');
    const registerContainer = document.getElementById('registerContainer');
    const backToLoginRegister =document.getElementById('backToLoginRegister');
    
    // Mostrar formulario de solicitud de contraseña y ocultar el login
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        loginContainer.classList.add('d-none'); 
        solicitudContainer.classList.remove('d-none'); 
    });

    // Volver al formulario de login
    backToLoginLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        solicitudContainer.classList.add('d-none'); 
        loginContainer.classList.remove('d-none');
    });

    // Mostrar formulario de registro
    register.addEventListener('click', function(event){
        event.preventDefault();
        loginContainer.classList.add('d-none');
        registerContainer.classList.remove('d-none');
    });

    //Volver al formulario de login
    backToLoginRegister.addEventListener('click', function(event){
        event.preventDefault();
        registerContainer.classList.add('d-none');
        loginContainer.classList.remove('d-none');
    });
});
