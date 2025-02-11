const new__cassette = document.getElementById ("new__cassette");
const new__cassetteModal = document.getElementById ("new__cassetteModal");
const close__btn = document.getElementById ("close__btn");

const delete__cassette = document.getElementById ("delete__cassette");
const delete__cassetteModal = document.getElementById ("delete__cassetteModal");
const close__btn__delete = document.getElementById ("close__btn__delete");

const edit__cassette = document.getElementById ("edit__cassette");
const edit__cassetteModal = document.getElementById ("edit__cassetteModal");
const close__btn__edit = document.getElementById ("close__btn__edit");

const new__muestra = document.getElementById ("new__muestra");
const new__muestraModal = document.getElementById ("new__muestraModal");
const close__btn__newMuestra = document.getElementById ("close__btn__newMuestra");

const showModal = (event) => {
    const modalId = event.target.id + "Modal";
    document.getElementById(modalId).classList.remove("d-none");
};

const closeModal = (event) => {
    const closeId=event.target.parentNode.parentNode.id;
    document.getElementById(closeId).classList.add("d-none");
};


//LISTENER
// new__cassette.addEventListener("click", showModal);
// close__btn.addEventListener("click", closeModal);

// delete__cassette.addEventListener("click", showModal);
// close__btn__delete.addEventListener("click", closeModal);

// edit__cassette.addEventListener("click", showModal);
// close__btn__edit.addEventListener("click", closeModal);

// new__muestra.addEventListener("click", showModal);
// close__btn__newMuestra.addEventListener("click", closeModal);


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
