let formnewmuestra = document.getElementById("formnewmuestra")
let form__editMuestra = document.getElementById("form__editMuestra");
let descripcion_m = document.getElementById("descripcion_m");
let fecha_m = document.getElementById("fecha_m");
let tincion_m = document.getElementById("tincion_m");
let observaciones_m = document.getElementById("observaciones_m");
let tdbody_muestra = document.getElementById("tdbody_muestra");

let descripcion = document.getElementById("descripcion");
let fecha = document.getElementById("fecha");
let tincion = document.getElementById("tincion");
let observaciones = document.getElementById("observaciones");


let detail__muestra = document.getElementById("detail__muestra");
let delete_muestra = document.getElementById("delete_muestra");
let detalleDescripcion_muestra = document.getElementById("detalleDescripcion_muestra");
let detalleFecha_muestra = document.getElementById("detalleFecha_muestra");
let detalleTincion_muestra = document.getElementById("detalleTincion_muestra");
let detalleObservaciones_muestra = document.getElementById("detalleObservaciones_muestra");
let confirm_delete = document.getElementById("confirm-delete");
let delete__muestraModal = document.getElementById("delete__muestraModal");


let descripcion_edit_muestra = document.getElementById("descripcion_edit_muestra");
let fecha_edit_muestra = document.getElementById("fecha_edit_muestra");
let tincion_edit_muestra = document.getElementById("tincion_edit_muestra");
let observacion_edit_muestra = document.getElementById("observacion_edit_muestra");
let imagen_detail_muestra = document.getElementById("imagen_detail_muestra");
let edit__muestraModal = document.getElementById("edit__muestraModal");
let imagenInput = document.getElementById("imagen_detail_muestra");
let delete__imageModal = document.getElementById("delete__imageModal")
let modal_image_delete = document.getElementById("modal_image_delete")
let images_muestra = document.getElementById("images_muestra");
let noconfirm_delete_image = document.getElementById("noconfirm-delete-image");
let confirm_delete_image = document.getElementById("confirm-delete-image")
import { newMuestra, getAllMuestraByCassette, getOneMuestra, deleteMuestra, updateMuestra } from "./dashboardApisMuestras.js"

import { CreateImage, deleteImage, showallimages } from "./dashboardApisImage.js"

const today = new Date().toISOString().split("T")[0];

//muestras 
let CreateNewMuestra = async (event) => {
    event.preventDefault();

    let cassette = localStorage.getItem('cassette');


    let data = {
        fecha: fecha_m.value,
        observaciones: observaciones_m.value,
        descripcion: descripcion_m.value,
        tincion: tincion_m.value,
        CassetteId: cassette


    }

    let response = await newMuestra(data);
    if (response) {
        document.getElementById('new__muestraModal').classList.add('d-none');
        fecha_m.value = '';
        observaciones_m.value = '';
        descripcion_m.value = '';
        tincion_m.value = '';
        printMuestras()
    }
}

let printmessegemuestra = (msg, div) => {
    div.innerHTML = "";
    let fragment = document.createDocumentFragment();
    let tr = document.createElement("tr");
    tr.setAttribute("class", "border-b hover:bg-blue-50");
    let td = document.createElement("td");
    td.setAttribute("class", "p-1 text-red-500")
    td.textContent = msg;
    tr.appendChild(td)
    fragment.appendChild(tr);
    div.appendChild(fragment);
}


let printmessegeimagenes = (msg, div) => {
    div.innerHTML = "";
    let fragment = document.createDocumentFragment();
    let tr = document.createElement("tr");
    tr.setAttribute("class", "border-b hover:bg-blue-50");
    let td = document.createElement("td");
    td.setAttribute("class", "p-1 text-red-500")
    td.textContent = msg;
    tr.appendChild(td)
    fragment.appendChild(tr);
    div.appendChild(fragment);
}

export let printMuestras = async () => {
    let cassette = localStorage.getItem('cassette');



    let data = await getAllMuestraByCassette(cassette);
    if (data.length === 0) {
        tdbody_muestra.innerHTML = "";
        let msg = "No se ha encontrado ninguna muestra"
        // printmessegemuestra(msg , tdbody_muestra); 

    } else {

        tdbody_muestra.innerHTML = "";
        data.forEach(element => {
            let fragment = document.createDocumentFragment();
            let tr = document.createElement("tr");

            tr.classList.add("border-b", "hover:bg-blue-50");

            let fecha = element.fecha.split("T")[0];
            let td1 = document.createElement("td");
            td1.textContent = fecha;
            td1.classList.add("p-1");

            let td2 = document.createElement("td");
            td2.textContent = element.descripcion;
            td2.classList.add("p-1");

            let td3 = document.createElement("td");
            td3.textContent = element.tincion;
            td3.classList.add("p-1");

            let td4 = document.createElement("td");
            td4.classList.add("p-1", "flex", "items-center", "justify-end");

            let button = document.createElement("button");

            let svg = create_svg()

            button.innerHTML = svg;
            button.value = element.id;
            button.id = "botonDetalle__muestra";


            td4.appendChild(button);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            fragment.appendChild(tr);

            tdbody_muestra.appendChild(fragment);


        });
    }
};
let create_svg = () => {
    let svg = ` <svg class="h-5 w-11 text-blue-400 hover:text-blue-900" stroke-width="5" viewBox="0 0 23 23" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
    </svg>`;

    return svg;
}

let idmuestra
// obtener detalles de una muestra
let muestras = async (event) => {

    let button = event.target.closest("button");
    if (button && button.id === "botonDetalle__muestra") {
        idmuestra = button.getAttribute("value");
        // localStorage.setItem('idmuestra', idmuestra);
        await mostrarDetalles(idmuestra);
        await showimagesmuestra();
        detail__muestra.classList.remove("d-none")
    }

    printMuestras()
}





let mostrarDetalles = async (idmuestra) => {

    let element = await getOneMuestra(idmuestra);
    detalleDescripcion_muestra.textContent = "";
    detalleFecha_muestra.textContent = "";
    detalleTincion_muestra.textContent = "";
    detalleObservaciones_muestra.textContent = "";
    confirm_delete.setAttribute("value", null);
    detalleDescripcion_muestra.textContent = element.descripcion;
    detalleFecha_muestra.textContent = element.fecha.split("T")[0];
    detalleTincion_muestra.textContent = element.tincion;
    detalleObservaciones_muestra.textContent = element.observaciones;
    confirm_delete.setAttribute("value", element.id);
    idmuestra = element.id;


    descripcion_edit_muestra.value = element.descripcion;
    fecha_edit_muestra.value = element.fecha.split("T")[0]
    tincion_edit_muestra.value = element.tincion
    observacion_edit_muestra.value = element.observaciones;
    printMuestras()
}



// Editar una muestra
const editarMuestra = async (event) => {
    let cassette = localStorage.getItem('cassette');
    event.preventDefault();



    let data = {
        id: idmuestra,
        fecha: fecha_edit_muestra.value,
        observaciones: observacion_edit_muestra.value,
        descripcion: descripcion_edit_muestra.value,
        tincion: tincion_edit_muestra.value,
        CassetteId: cassette
    }
    let response = await updateMuestra(data, idmuestra);



    if (response) {
        edit__muestraModal.classList.add("d-none");
        detail__muestra.classList.add("d-none");
        printMuestras()
    }
    printMuestras()

}
let addimageDetail = async (event) => {
    event.preventDefault();
    let dataimage = {
        idMuestra: idmuestra,
        fileImage: imagen_detail_muestra.files[0]

    }

    await CreateImage(dataimage.idMuestra, dataimage.fileImage)

    await showimagesmuestra()
    printMuestras()
    muestras()
}

let showimagesmuestra = async () => {

    let images = await showallimages(idmuestra);

    images_muestra.innerHTML = "";

    // Crear y mostrar las imágenes en el cuerpo del documento



    if (images.length == 0) {
        tdbody_muestra.innerHTML = "";
        let msg = "No se han insertado imagenes . "
        // printmessegeimagenes(msg , tdbody_muestra); 
    } else {
        images.forEach(element => {
            let fragment = document.createDocumentFragment();


            const img = document.createElement('IMG');
            img.setAttribute("src", element[0]);
            img.setAttribute("alt", element[1]);
            img.setAttribute("class", "p-2 h-52");
            document.body.appendChild(img);

            // Opcional: Revocar la URL del objeto después de que la imagen se haya cargado para liberar memoria
            img.onload = () => {
                URL.revokeObjectURL(element[0]);
            };

            fragment.appendChild(img);

            images_muestra.appendChild(fragment);
        });
    }
    printMuestras()
}


// Eliminar una muestra
const borrarMuestra = async (event) => {
    let id = event.target.value
    const response = await deleteMuestra(id);

    if (response) {
        delete__muestraModal.classList.add("d-none");
        detail__muestra.classList.add("d-none");
        printMuestras()
    }
    printMuestras()
};

let showimagefordelete = (event) => {
    if (event.target.tagName == "IMG") {
        modal_image_delete.innerHTML = "";



        let fragment = document.createDocumentFragment();
        let img = event.target;


        fragment.appendChild(img);
        modal_image_delete.appendChild(fragment);
        confirm_delete_image.value = event.target.alt
        delete__imageModal.classList.remove("d-none");

    }
}

let deleteimage = async () => {

    if (confirm_delete_image.value) {
        let id = confirm_delete_image.value
        let result = await deleteImage(id)
        if (result) {
            delete__imageModal.classList.add("d-none");
            await showimagesmuestra()
        }

    }
    printMuestras()


}

let notshowdelete = async () => {
    delete__imageModal.classList.add("d-none");
    printMuestras()
    await showimagesmuestra();
}

const createErrorElement = (input) => {
    let error = document.createElement("span");
    error.classList.add("error-message", "hidden");
    error.style.color = "red";
    error.style.fontSize = "12px";
    input.after(error);
    return error;
};

const errorDescripcion = createErrorElement(descripcion_m);
const errorFecha = createErrorElement(fecha_m);
const errorTincion = createErrorElement(tincion_m);
const errorObservaciones = createErrorElement(observaciones_m);

const hideAllErrors = () => {
    document.querySelectorAll(".error-message").forEach(error => error.classList.add("hidden"));
};

const showFirstError = (input, errorElement, message) => {
    hideAllErrors();
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    input.focus();
};

fecha.setAttribute("min", today);
fecha_m.setAttribute("min", today);
const validarMuestra = (event) => {
    event.preventDefault();
    hideAllErrors();

    if (descripcion_m.value.trim() === "") {
        return showFirstError(descripcion_m, errorDescripcion, "La descripción es obligatoria.");
    }

    if (!fecha_m.value) {
        return showFirstError(fecha_m, errorFecha, "Debe seleccionar una fecha.");
    }

    if (tincion_m.value === "" || tincion_m.selectedIndex === 0) {
        return showFirstError(tincion_m, errorTincion, "Debe seleccionar una tinción.");
    }

    if (observaciones_m.value.trim() === "") {
        return showFirstError(observaciones_m, errorObservaciones, "Las observaciones son obligatorias.");
    }

};

const errorEditMuestra = createErrorElement(descripcion_edit_muestra);
const errorEditFechaMuestra = createErrorElement(fecha_edit_muestra);
const errorEditTincionMuestra = createErrorElement(tincion_edit_muestra);
const errorEditObservacionesMuestra = createErrorElement(observacion_edit_muestra);

form__editMuestra.addEventListener("submit", (event) => {
    event.preventDefault();
    hideAllErrors();

    if (descripcion_edit_muestra.value.trim() === "") {
        return showFirstError(descripcion_edit_muestra, errorEditMuestra, "La descripción es obligatoria.");
    }

    if (!fecha_edit_muestra.value) {
        return showFirstError(fecha_edit_muestra, errorEditFechaMuestra, "Debe seleccionar una fecha.");
    }

    if (tincion_edit_muestra.value === "" || tincion_edit_muestra.selectedIndex === 0) {
        return showFirstError(tincion_edit_muestra, errorEditTincionMuestra, "Debe seleccionar una tinción.");
    }

    if (observacion_edit_muestra.value.trim() === "") {
        return showFirstError(observacion_edit_muestra, errorEditObservacionesMuestra, "Las observaciones son obligatorias.");
    }

    console.log("Formulario validado correctamente.");
});

document.addEventListener("DOMContentLoaded", function () {
    const qrButton = document.getElementById("detail__QRCassette");
    const qrModal = document.getElementById("show__QRModal");
    const qrClose = document.getElementById("close__QR");
    const qrContainer = document.getElementById("img__QR");

    qrButton.addEventListener("click", async () => {
        const id = localStorage.getItem("cassette");
        console.log(id);
        try {
            let response = await fetch(`http://localhost:3000/v1/cassette/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "user-token": sessionStorage.getItem('user-token')
                }
            });

            const data = await response.json();
            if (data.qr_cassette) {
                qrContainer.innerHTML = "";
                new QRCode(qrContainer, data.qr_cassette);
                qrModal.classList.remove("d-none");
            }
            console.log(data)
            return data;
        } catch (error) {
            return false;
        }
    });

    qrClose.addEventListener("click", function () {
        qrModal.classList.add("d-none");
    });

    window.addEventListener("click", function (event) {
        if (event.target === qrModal) {
            qrModal.classList.add("d-none");
        }
    });
});

const errorMessage = document.getElementById("error-message");
const validarImagen = (event) => {
    let file = event.target.files[0];
    errorMessage.classList.add("hidden");
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/bmp"];

    if (!allowedTypes.includes(file.type)) {
        errorMessage.textContent = "Solo se permiten imágenes estáticas (JPG, PNG, WEBP, BMP).";
        errorMessage.classList.remove("hidden");
        imagen_detail_muestra.value = "";
        return;
    }

    errorMessage.classList.add("hidden");
};

//LISTENER
formnewmuestra.addEventListener("submit", validarMuestra);
imagen_detail_muestra.addEventListener("change", validarImagen);
imagenInput.addEventListener("change", addimageDetail);
formnewmuestra.addEventListener("submit", CreateNewMuestra);
form__editMuestra.addEventListener("submit", editarMuestra);
confirm_delete.addEventListener("click", borrarMuestra);
tdbody_muestra.addEventListener("click", muestras);
images_muestra.addEventListener("click", showimagefordelete);
confirm_delete_image.addEventListener("click", deleteimage);
noconfirm_delete_image.addEventListener("click", notshowdelete);