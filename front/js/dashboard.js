let createCassette = document.getElementById("createCassette");
let descripcion = document.getElementById("descripcion");
let fecha = document.getElementById("fecha");
let organo= document.getElementById("organo");
let caracteristicas = document.getElementById("caracteristicas");
let observaciones = document.getElementById("observaciones");
let identificador_cassette = document.getElementById("identificador_cassette");
const user_token = sessionStorage.getItem('user-token');
import {postCassette} from "./dashboardApis.js"
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
    }


}

createCassette.addEventListener("submit" , insertnewCassete)