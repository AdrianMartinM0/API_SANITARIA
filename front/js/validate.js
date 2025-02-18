const form = document.getElementById("createCassette");
const descripcion = document.getElementById("descripcion");
const identificador = document.getElementById("identificador_cassette");
const fecha = document.getElementById("fecha");
const organo = document.getElementById("organo");
const caracteristicas = document.getElementById("caracteristicas");
const observaciones = document.getElementById("observaciones");

const createErrorElement = (input) => {
    let error = document.createElement("span");
    error.classList.add("error-message", "hidden");
    error.style.color = "red";
    error.style.fontSize = "12px";
    input.insertAdjacentElement("afterend", error);
    return error;
};

const errorDescripcion = createErrorElement(descripcion);
const errorIdentificador = createErrorElement(identificador);
const errorFecha = createErrorElement(fecha);
const errorOrgano = createErrorElement(organo);
const errorCaracteristicas = createErrorElement(caracteristicas);
const errorObservaciones = createErrorElement(observaciones);

const hideAllErrors = () => {
    document.querySelectorAll(".error-message").forEach(error => error.classList.add("hidden"));
};

const showFirstError = (input, errorElement, message) => {
    hideAllErrors();
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    input.focus();
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    hideAllErrors();

    if (descripcion.value.trim() === "") {
        return showFirstError(descripcion, errorDescripcion, "La descripción es obligatoria.");
    }

    if (identificador.value.trim() === "") {
        return showFirstError(identificador, errorIdentificador, "El identificador es obligatorio.");
    }

    if (!fecha.value) {
        return showFirstError(fecha, errorFecha, "Debe seleccionar una fecha.");
    }

    if (organo.value === "") {
        return showFirstError(organo, errorOrgano, "Debe seleccionar un órgano.");
    }

    if (caracteristicas.value.trim() === "") {
        return showFirstError(caracteristicas, errorCaracteristicas, "Las características son obligatorias.");
    }

    if (observaciones.value.trim() === "") {
        return showFirstError(observaciones, errorObservaciones, "Las observaciones son obligatorias.");
    }

    console.log("Formulario validado correctamente.");
});