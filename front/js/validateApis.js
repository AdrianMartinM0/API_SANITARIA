let getUser = async (email) => {
  try {
    let response = await fetch(`http://localhost:3000/v1/usuario/${email}`);
    if (response.status != 200) 
      return false;

    return true;
    
  } catch (error) {
    console.error("Error fetching user:", error);
    return false;
  }
};

export let getinforegister = async ({email_param, nombre_param, apellidos_param, centro_param, password_param}) => {
  let json = {
    nombre: nombre_param,
    apellidos: apellidos_param,
    email: email_param,
    password: password_param,
    centro: centro_param,
  };
//Puesto70**
  let userExists = await getUser(json.email);
 
  if (!userExists) {
    try {
      let response = await fetch("http://localhost:3000/v1/usuario/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });
    
        return true;
     
   
    } catch (error) {
   
      return false;
    }
  
  } else {
    return false;
  }
};

export let testlogin = async (email , passwd )=>{

}


  
