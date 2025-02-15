let createCassette = document.getElementById("createCassette");
let descripcion = document.getElementById("descripcion");
let fecha = document.getElementById("fecha");
let organo= document.getElementById("organo");
let caracteristicas = document.getElementById("caracteristicas");
let observaciones = document.getElementById("observaciones");
let identificador_cassette = document.getElementById("identificador_cassette");
const user_token = sessionStorage.getItem('user-token');
console.log(user_token)
let insertnewCassete = (event)=>{
   
    event.preventDefault(); 
    console.log(descripcion.value)

    console.log(fecha.value)

    console.log(organo.value)

    console.log(caracteristicas.value)

    console.log(observaciones.value)
    let data = {
        descripcion : descripcion.value,
        fecha : fecha.value , 
        organo : organo.value ,
        caracteristicas : caracteristicas.value , 
        observaciones : observaciones.value , 
        identificador_cassette :  identificador_cassette.value ,
        user_token : user_token
    }


}

createCassette.addEventListener("submit" , insertnewCassete)