let createCassette = document.getElementById("createCassette");
let descripcion = document.getElementById("descripcion");
let fecha = document.getElementById("fecha");
let organo= document.getElementById("organo");
let caracteristicas = document.getElementById("caracteristicas");
let observaciones = document.getElementById("observaciones");
let identificador_cassette = document.getElementById("identificador_cassette");
let tbodycassetes = document.getElementById("tbodycassetes"); 
let org = document.getElementById("org");
let fech = document.getElementById("fech");
let iden = document.getElementById("iden");
let carac = document.getElementById("carac");
let obs = document.getElementById("obs");
let desc = document.getElementById("desc")
let deletebutton = document.getElementById("deletebutton");
const user_token = sessionStorage.getItem('user-token');
let observaciones_edit = document.getElementById("observaciones_edit");
let caracteristicas_edit = document.getElementById("caracteristicas_edit");
let organo_edit  = document.getElementById("organo_edit");
let fecha_edit = document.getElementById("fecha_edit");
let identificador_edit  = document.getElementById("identificador_edit");
let descripcion_edit  = document.getElementById("descripcion_edit");
let editform = document.getElementById("editform");
const logout = document.getElementById('logOut');

import {postCassette , GetallCassetesFromUser , GetOneCassetteById  , EditCasseteById,  DeleteCasseteById} from "./dashboardApis.js"


const createErrorElement = (input) => {
    let error = document.createElement("span");
    error.classList.add("error-message", "hidden");
    error.style.color = "red";
    error.style.fontSize = "12px";
    input.after(error);
    return error;
};

const hideAllErrors = () => {
    document.querySelectorAll(".error-message").forEach(error => error.classList.add("hidden"));
};

const showFirstError = (input, errorElement, message) => {
    hideAllErrors();
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    input.focus();
};

//MODAL NEW
const errorDescripcion = createErrorElement(descripcion);
const errorIdentificador_cassette = createErrorElement(identificador_cassette);
const errorFecha = createErrorElement(fecha);
const errorOrgano = createErrorElement(organo);
const errorCaracteristicas = createErrorElement(caracteristicas);
const errorObservaciones = createErrorElement(observaciones);

createCassette.addEventListener("submit", (event) => {
    event.preventDefault();
    hideAllErrors();

    if (descripcion.value.trim() === "") {
        return showFirstError(descripcion, errorDescripcion, "La descripción es obligatoria.");
    }

    if (identificador_cassette.value.trim() === "") {
        return showFirstError(identificador_cassette, errorIdentificador_cassette, "El identificador es obligatorio.");
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

    insertnewCassete();
});

//MODAL EDIT
const errorIdentificador_edit = createErrorElement(identificador_edit);
const errorDescripcion_edit = createErrorElement(descripcion_edit);
const errorFecha_edit = createErrorElement(fecha_edit);
const errorOrgano_edit = createErrorElement(organo_edit);
const errorCaracteristicas_edit = createErrorElement(caracteristicas_edit);
const errorObservaciones_edit = createErrorElement(observaciones_edit);

editform.addEventListener("submit", (event) => {
    event.preventDefault();
    hideAllErrors();

    if (descripcion_edit.value.trim() === "") {
        return showFirstError(descripcion_edit, errorDescripcion_edit, "La descripción es obligatoria.");
    }

    if (identificador_edit.value.trim() === "") {
        return showFirstError(identificador_edit, errorIdentificador_edit, "El identificador es obligatorio.");
    }

    if (!fecha_edit.value) {
        return showFirstError(fecha_edit, errorFecha_edit, "Debe seleccionar una fecha.");
    }

    if (organo_edit.value === "") {
        return showFirstError(organo_edit, errorOrgano_edit, "Debe seleccionar un órgano.");
    }

    if (caracteristicas_edit.value.trim() === "") {
        return showFirstError(caracteristicas_edit, errorCaracteristicas_edit, "Las características son obligatorias.");
    }

    if (observaciones_edit.value.trim() === "") {
        return showFirstError(observaciones_edit, errorObservaciones_edit, "Las observaciones son obligatorias.");
    }

});

//INSERT

let insertnewCassete =  async (event)=>{
    let data = {
        descripcion : descripcion.value,
        fecha : fecha.value , 
        organo : organo.value ,
        caracteristicas : caracteristicas.value , 
        observaciones : observaciones.value , 
        identificador_cassette :  identificador_cassette.value ,
    }

    let response = await postCassette(data);
    if (response){
        document.getElementById('new__cassetteModal').classList.add('d-none');
        descripcion.value = '';
        fecha.value = '';
        organo.value = '';
        caracteristicas.value = '';
        observaciones.value = '';
        identificador_cassette.value = '';
        printAllCassetes()
    }
}


let printAllCassetes =  async () => {
    tbodycassetes.innerHTML =""; 
    let array = await GetallCassetesFromUser();
    const cassettesList = await array;
    cassettesList.forEach(element => {

        let fragment = document.createDocumentFragment();

        let tr = document.createElement("tr");
        tr.class = "border-b hover:bg-blue-50";
        let fecha = element.fecha.split("T")[0];
        let td1 = document.createElement("td");
        td1.textContent = fecha;
        td1.classList.add("p-1");

        let td2 = document.createElement("td");
        td2.classList.add("p-1");
    
        td2.textContent = element.descripcion;

        let td3 = document.createElement("td");
        td3.classList.add("p-1");
        td3.textContent = element.organo;

        let td4 = document.createElement("td");
        td4.classList.add("p-1", "flex", "items-center", "justify-end");

        let button = document.createElement("button");
        
        let svg = create_svg()

        button.innerHTML = svg;
        button.value=element.id;
        button.id="button_details";
        
        td4.appendChild(button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        fragment.appendChild(tr);
        tbodycassetes.appendChild(fragment);
    });
    
};

const printFilteredCassetesByOrgano = async (organo) => {
    tbodycassetes.innerHTML = "";
    const array = await GetallCassetesFromUser();
    
    const filteredArray = organo === "*" ? array : array.filter(cassette => cassette.organo === organo);

    renderCassetes(filteredArray);
};

const printFilteredCassetesByDate = async (fechaInicio, fechaFin) => {
    tbodycassetes.innerHTML = "";
    const array = await GetallCassetesFromUser();

    const filteredArray = array.filter(cassette => {
        const fechaCassette = cassette.fecha.split("T")[0];

        if (fechaInicio && !fechaFin) {
            return fechaCassette === fechaInicio;
        }
        if (fechaInicio && fechaFin) {
            return fechaCassette >= fechaInicio && fechaCassette <= fechaFin;
        }
        return true;
    });

    renderCassetes(filteredArray);
};

const renderCassetes = (array) => {
    tbodycassetes.innerHTML = "";

    array.forEach(element => {
        let fragment = document.createDocumentFragment();
        let tr = document.createElement("tr");
        tr.setAttribute("class", "border-b hover:bg-blue-50");

        let fecha = element.fecha.split("T")[0];
        let td1 = document.createElement("td");
        td1.setAttribute("class", "p-1");
        td1.textContent = fecha;

        let td2 = document.createElement("td");
        td2.setAttribute("class", "p-1");
        td2.textContent = element.descripcion;

        let td3 = document.createElement("td");
        td3.setAttribute("class", "p-1");
        td3.textContent = element.organo;

        let td4 = document.createElement("td");
        td4.setAttribute("class", "p-1 text-left");

        let button = document.createElement("button");
        let svg = create_svg();
        button.innerHTML = svg;
        button.setAttribute("value", element.id);
        button.setAttribute("id", "button_details");

        td4.appendChild(button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        fragment.appendChild(tr);
        tbodycassetes.appendChild(fragment);
    });
};

const initializeFilters = () => {
    const selectOrgano = document.querySelector("select");
    const fechaInicioInput = document.querySelectorAll("input[type='date']")[0];
    const fechaFinInput = document.querySelectorAll("input[type='date']")[1];
    let noUsable = true;
    fechaFinInput.disabled = noUsable;

    selectOrgano.addEventListener("change", async () => {
        let selectedOrgano = selectOrgano.value;
        noUsable = true;
        fechaFinInput.disabled = noUsable;
        fechaInicioInput.value = "";
        fechaFinInput.value = "";
        printFilteredCassetesByOrgano(selectedOrgano);
    });

    fechaInicioInput.addEventListener("change", async () => {
        noUsable = false;
        fechaFinInput.disabled = noUsable;
        let fechaInicio = fechaInicioInput.value;
        let fechaFin = fechaFinInput.value;
        selectOrgano.selectedIndex = 0;
        printFilteredCassetesByDate(fechaInicio, fechaFin);
    });

    fechaFinInput.addEventListener("change", async () => {
        let fechaInicio = fechaInicioInput.value;
        let fechaFin = fechaFinInput.value;
        selectOrgano.selectedIndex = 0;
        printFilteredCassetesByDate(fechaInicio, fechaFin);
    });
};

const logOut = () => {
    sessionStorage.removeItem('user-token');
    location.reload();
}

let create_svg = () => {
    let svg = `<svg class="h-5 w-11 text-blue-400 hover:text-blue-900" stroke-width="5" viewBox="0 0 23 23" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
    </svg>`;

    return svg;
}


let printDetailsCassette = async (event)=>{
    
    if (event.target.parentElement.parentElement.tagName == "BUTTON") {
        
     let num = event.target.parentElement.parentElement.getAttribute("value"); 
     localStorage.setItem('cassette', num);
     await imprimirdetalles();
    }

} ; 

let cassete = localStorage.getItem('cassette');
let imprimirdetalles = async ()=>{
 
    org.textContent = "";
    fech.textContent = "";
    iden.textContent = "";
    carac.textContent = "";
    obs.textContent = "";
    desc.textContent = "";
    
    observaciones_edit.value = "";
    caracteristicas_edit.value = "";
    organo_edit.value  ="";
    fecha_edit.value = "";
    identificador_edit.value  = "";
    descripcion_edit.value  = "";
    let element = await GetOneCassetteById(cassete)
    org.textContent = element.organo;
    fech.textContent = element.fecha.split("T")[0]
    iden.textContent = element.identificador_cassette;
    carac.textContent = element.caracteristicas;
    obs.textContent = element.observaciones;
    desc.textContent = element.descripcion;
    
    observaciones_edit.value = element.observaciones;
    caracteristicas_edit.value = element.caracteristicas;
    organo_edit.value  = element.organo;
    fecha_edit.value = element.fecha.split("T")[0];
    identificador_edit.value  = element.identificador_cassette;
    descripcion_edit.value  =  element.descripcion;
}

let DeleteCassete = async ()=>{
   
    let response = await DeleteCasseteById(cassete);
    if (response) 
        document.getElementById('delete__cassetteModal').classList.add('d-none');
    org.textContent = "";
    fech.textContent = "";
    iden.textContent = "";
    carac.textContent = "";
    obs.textContent = "";
    desc.textContent = "";
    localStorage.setItem('cassette', null);
    printAllCassetes()
}



let  EditCassette = async (event)=>{
    event.preventDefault(); 
   
    let data = {
        observaciones : observaciones_edit.value ,
        caracteristicas :  caracteristicas_edit.value,
        organo :  organo_edit.value  ,
        fecha :  fecha_edit.value ,
        identificador_cassette :  identificador_edit.value,  
        descripcion : descripcion_edit.value ,
    }
    
    let response = await EditCasseteById( cassete, data );
    if(response){
        document.getElementById('edit__cassetteModal').classList.add('d-none');
        printAllCassetes()
        imprimirdetalles()
    }
}

document.addEventListener('DOMContentLoaded', () => {
    printAllCassetes();
    initializeFilters();
});


logout.addEventListener("click", logOut);
deletebutton.addEventListener("click" , DeleteCassete);
tbodycassetes.addEventListener("click" , printDetailsCassette);
editform.addEventListener("submit" ,EditCassette );
// createCassette.addEventListener("submit" , insertnewCassete);