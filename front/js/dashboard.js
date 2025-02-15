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
let deletebutton = document.getElementById("deletebutton");
const user_token = sessionStorage.getItem('user-token');
import {postCassette , GetallCassetesFromUser , GetOneCassetteById  , DeleteCasseteById} from "./dashboardApis.js"
console.log(user_token)
let insertnewCassete =  async (event)=>{
   
    event.preventDefault(); 
  
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
        alert ("Cassette registrado correctamente !");
        printAllCassetes()
    }


}

let printAllCassetes =  async () => {
    tbodycassetes.innerHTML =""; 
    let array = await GetallCassetesFromUser();
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

    let svg = create_svg()


    button.innerHTML =    svg;
    button.setAttribute("value" , element.id);
    button.setAttribute("id" , "button_details");
   
    
    td4.appendChild(button);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    fragment.appendChild(tr);
    tbodycassetes.appendChild(fragment);
});
    
};

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
    
    let  numero ;
    if (event.target.parentElement.parentElement.tagName == "BUTTON") {
     numero  = event.target.parentElement.parentElement.getAttribute("value"); 

     await imprimirdetalles(numero);
    }
    



} ; 


let imprimirdetalles = async (id)=>{
    let num = Number(id)
    localStorage.setItem('cassette', id);
    org.textContent = "";
    fech.textContent = "";
    iden.textContent = "";
    carac.textContent = "";
    obs.textContent = "";
    let element = await GetOneCassetteById(num)
     org.textContent = element.organo;
     fech.textContent = element.fecha.split("T")[0]
     iden.textContent = element.identificador_cassette;
     carac.textContent = element.caracteristicas;
     obs.textContent = element.observaciones;
}

let deletecassete = async ()=>{
    let cassete = localStorage.getItem('cassette');
let response = await DeleteCasseteById(cassete);
if (response) {
    alert ("Cassette eliminado  correctamente !");
}
printAllCassetes()
}
printAllCassetes()
deletebutton.addEventListener("click" , deletecassete)
tbodycassetes.addEventListener("click" , printDetailsCassette )
createCassette.addEventListener("submit" , insertnewCassete)