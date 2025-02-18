let formnewmuestra = document.getElementById("formnewmuestra")

let descripcion_m = document.getElementById("descripcion_m");
let fecha_m = document.getElementById("fecha_m");
let tincion_m = document.getElementById("tincion_m");
let observaciones_m = document.getElementById("observaciones_m");
import { newMuestra} from "./dashboardApisMuestra.js"


//muestras 
let CreateNewMuestra = (event)=>{
    event.preventDefault(); 
 


let data = {
    fecha : fecha_m.value ,
    observaciones  : observaciones_m.value , 
    descripcion : descripcion_m.value , 
    tincion : tincion_m.value ,
    CassetteId : num


}
console.log(data);
}

formnewmuestra.addEventListener("submit" , CreateNewMuestra)