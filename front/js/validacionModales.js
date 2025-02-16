
// Modal Nuevo Cassette
const cassetteForm = document.getElementById("cassetteForm");

const descripcionInput = document.getElementById("descripcion");
const fechaInput = document.getElementById("fecha");
const organoInput = document.getElementById("organo");
const caracteristicasInput = document.getElementById("caracteristicas");
const observacionesInput = document.getElementById("observaciones");

const errorDescripcion = document.getElementById("error-descripcion");
const errorFecha = document.getElementById("error-fecha");
const errorOrgano = document.getElementById("error-organo");
const errorCaracteristicas = document.getElementById("error-caracteristicas");
const errorObservaciones = document.getElementById("error-observaciones");


function showError(id) {
    document.getElementById(id).classList.remove("hidden");
}


function hideError(id) {
    document.getElementById(id).classList.add("hidden");
}


function validarCassetteFormulario(event) {
    event.preventDefault();  

    hideErrors();

  
  
    if (descripcionInput.value.trim() === "") {
        showError("error-descripcion");
        descripcionInput.focus();
        return;  
    }

    hideError("error-descripcion"); 


    if (fechaInput.value.trim() === "") {
        showError("error-fecha");
        fechaInput.focus();
        return;  
    }

    hideError("error-fecha"); 
    
    if (organoInput.value === "") {
        showError("error-organo");
        organoInput.focus();
        return;  
    }

    hideError("error-organo"); 


    if (caracteristicasInput.value.trim() === "") {
        showError("error-caracteristicas");
        caracteristicasInput.focus();
        return;  
    }

    hideError("error-caracteristicas"); 
    if (observacionesInput.value.trim() === "") {
        showError("error-observaciones");
        observacionesInput.focus();
        return;  
    }

    hideError("error-observaciones"); 

}


cassetteForm.addEventListener("submit", validarCassetteFormulario);

function hideErrors() {
    let errorElements = document.querySelectorAll(".text-red-500");
    errorElements.forEach(error => error.classList.add("hidden"));
}

descripcionInput.addEventListener("input", () => {
    if (descripcionInput.value.trim() !== "") {
        hideError("error-descripcion");
    }
});

fechaInput.addEventListener("input", () => {
    if (fechaInput.value.trim() !== "") {
        hideError("error-fecha");
    }
});

organoInput.addEventListener("change", () => {
    if (organoInput.value !== "") {
        hideError("error-organo");
    }
});

caracteristicasInput.addEventListener("input", () => {
    if (caracteristicasInput.value.trim() !== "") {
        hideError("error-caracteristicas");
    }
});

observacionesInput.addEventListener("input", () => {
    if (observacionesInput.value.trim() !== "") {
        hideError("error-observaciones");
    }
});


//Modal nueva muestra

const newMuestraForm = document.getElementById("newMuestraForm");

const newDescripcionInput = document.getElementById("newDescripcion");
const newFechaInput = document.getElementById("newFecha");
const newTincionInput = document.getElementById("newTincion");
const newObservacionesInput = document.getElementById("newObservaciones");
const newImagenInput = document.getElementById("newImagen");


function showError(className) {
    const errorElement = document.querySelector(`.${className}`);
    if (errorElement) {
        errorElement.classList.remove("hidden");
    }
}


function hideError(className) {
    const errorElement = document.querySelector(`.${className}`);
    if (errorElement) {
        errorElement.classList.add("hidden");
    }
}

function validarNuevaMuestraFormulario(event) {
    event.preventDefault();  
    hideErrors();  

    if (newDescripcionInput.value.trim() === "") {
        showError("error-descripcion");
        newDescripcionInput.focus();
        return;  
    }

   
    if (newFechaInput.value.trim() === "") {
        showError("error-fecha");
        newFechaInput.focus();
        return;
    }

  
    if (newTincionInput.value === "") {
        showError("error-tincion");
        newTincionInput.focus();
        return;
    }

    if (newObservacionesInput.value.trim() === "") {
        showError("error-observaciones");
        newObservacionesInput.focus();
        return;
    }

    if (newImagenInput.files.length === 0) {
        showError("error-imagen");
        newImagenInput.focus();
        return;
    }
}


newMuestraForm.addEventListener("submit", validarNuevaMuestraFormulario);

function hideErrors() {
    let errorElements = document.querySelectorAll(".text-red-500");
    errorElements.forEach(error => error.classList.add("hidden"));
}
