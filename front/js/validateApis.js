export let getUser = async (email) => {
    let response = await fetch(`http://localhost:3000/v1/usuario/${email}`);
    
    if (response.ok) {
      return true;
    }
    
    return false;
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
      const data = await response.json();
        console.log(data)
        return true;

    
   
    } catch (error) {
   
      return false;
    }
  
  } else {
   
    return false;
  }
};

export let testlogin = async (email, passwd) => {
  try {
    let testemail = await getUser(email);
    if (testemail) {
      let json = {
        password: passwd
      };
      let response = await fetch(`http://localhost:3000/v1/usuario/login/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(response);
      return response.text();
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Error during login: ${error.message}`);
    return false;
  }
};

// let a = await getUser("prueba@gmail.com")
// console.log( a);

