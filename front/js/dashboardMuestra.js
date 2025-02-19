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
let detalleDescripcion = document.getElementById("detalleDescripcion");
let detalleFecha = document.getElementById("detalleFecha");
let detalleTincion = document.getElementById("detalleTincion");
let detalleObservaciones = document.getElementById("detalleObservaciones");


import {newMuestra , getAllMuestraByCassette , getOneMuestra  , deleteMuestra,  updateMuestra} from "./dashboardApisMuestras.js"


//muestras 
let CreateNewMuestra = async (event)=>{
    event.preventDefault(); 
 
let cassette = localStorage.getItem('cassette');


let data = {
    fecha : fecha_m.value ,
    observaciones  : observaciones_m.value , 
    descripcion : descripcion_m.value , 
    tincion : tincion_m.value ,
    CassetteId : cassette


}

let response = await newMuestra(data);
if(response){
    document.getElementById('new__muestraModal').classList.add('d-none');
    fecha_m.value = '';
    observaciones_m.value ='';
    descripcion_m.value = '';
    tincion_m.value = '';
    printMuestras()
}
}

let printMuestras = async () => {
    let cassette = localStorage.getItem('cassette');
    tdbody_muestra.innerHTML = ""; 
    
    let data = await getAllMuestraByCassette(cassette);
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
        button.value=element.id;
        button.id="botonDetalle__muestra";

        
        td4.appendChild(button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        fragment.appendChild(tr);
        
        tdbody_muestra.appendChild(fragment);

      
    });
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


// obtener detalles de una muestra
let muestras = async (event)=>{
   
        let button = event.target.closest("button"); // Asegura que es un botón
        if (button && button.id === "botonDetalle__muestra") {
            let idmuestra = button.getAttribute("value"); 
            localStorage.setItem('idmuestra', idmuestra);
            await mostrarDetalles(idmuestra);
            document.getElementById('detail__muestraModal').classList.remove('d-none'); 
        }
    }




let mostrarDetalles = async (idmuestra) => {

    let element = await getOneMuestra(idmuestra);
    if (element){
    document.getElementById('detail__muestra').classList.remove('d-none'); 

    detalleDescripcion.textContent = "";
    detalleFecha.textContent = "";
    detalleTincion.textContent = "";
    detalleObservaciones.textContent = "";

    descripcion.value = "";
    fecha.value = "";
    tincion.value = "";
    observaciones.value = "";

    let element = await getOneMuestra(idmuestra);
    console.log(element)

    detalleDescripcion.textContent = `Descripción: ${element.descripcion}`;
    detalleFecha.textContent = `Fecha: ${element.fecha.split("T")[0]}`;
    detalleTincion.textContent = `Tinción: ${element.tincion}`;
    detalleObservaciones.textContent = `Observaciones: ${element.observaciones}`;

    descripcion.value = element.descripcion;
    fecha.value = element.fecha.split("T")[0];
    tincion.value = element.tincion;
    observaciones.value = element.observaciones;
    }
}



// Editar una muestra
const editarMuestra = async (event) => {
    event.preventDefault(); 

    const data = {
        descripcion : descripcion_m.value,
        fecha : fecha_m.value,
        tincion : tincion_m.value,
        observaciones : observaciones_m.value,
    }

 let response = await updateMuestra(data);
 if (response){
    document.getElementById('edit__muestraModal').classList.add('d-none');
    printMuestras()
    printDetailsMuestra()
 }
}


// Eliminar una muestra
const borrarMuestra = async (id) => {
    const response = await deleteMuestra(id);

    if (response) {
        document.getElementById('delete__muestraModal').classList.add('d-none');
        descripcion_m.textContent = "";
        fecha_m.textContent = "";
        tincion_m.textContent = "";
        observaciones_m.textContent = "";
        localStorage.setItem('id', null);
        printMuestras()
    
    
    } 
};

document.addEventListener("DOMContentLoaded", () => {
    printMuestras(); 
});

formnewmuestra.addEventListener("submit" , CreateNewMuestra);
form__editMuestra.addEventListener("submit", editarMuestra);
delete_muestra.addEventListener("click", borrarMuestra);
tdbody_muestra.addEventListener("click", muestras);




