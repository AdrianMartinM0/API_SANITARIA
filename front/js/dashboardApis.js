export let postCassette = async (data) => {

  try {
    let response = await fetch("http://localhost:3000/v1/cassette", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      },
      body: JSON.stringify(data),
    });

    return response;



  } catch (error) {

    return false;
  }

}

export let GetallCassetesFromUser = async () => {


  try {
    let cassetes = await fetch("http://localhost:3000/v1/cassette", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      }
    });

    return cassetes.json();



  } catch (error) {

    return false;
  }

}

export let GetOneCassetteById = async (id) => {
  try {
    let cassetes = await fetch(`http://localhost:3000/v1/cassette/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      }
    });

    const data = await cassetes.json();
    return data;

  } catch (error) {

    return false;
  }
}

export let DeleteCasseteById = async (id) => {
  //  http://localhost:3000/v1/cassette/1 

  try {
    let response = await fetch(`http://localhost:3000/v1/cassette/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      }
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }



  } catch (error) {

    return false;
  }
}

export let EditCasseteById = async (id, data) => {
  //  http://localhost:3000/v1/cassette/1 

  try {
    let response = await fetch(`http://localhost:3000/v1/cassette/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }



  } catch (error) {

    return false;
  }
}

//API calls muestras
// Obtener todas las muestras de un cassette específico
export let getAllMuestraByCassette = async (id) => {
  try {
    let response = await fetch(`http://localhost:3000/v1/cassette/${id}/muestra`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      }
    });
    return response.json();
  } catch (error) {
    return false;
  }
};

// Obtener los detalles de una muestra específica
export let getOneMuestra = async (idmuestra) => {
  try {
    let response = await fetch(`http://localhost:3000/v1/muestra/${idmuestra}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      }
    });
    return response.json();
  } catch (error) {
    return false;
  }
};

// Crear una nueva muestra en un cassette
export let newMuestra = async (data) => {
  try {
    let response = await fetch(`http://localhost:3000/v1/cassette/${data}/muestra`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Modificar una muestra existente (excepto la imagen)
export let updateMuestra = async (data) => {
  try {
    let response = await fetch(`http://localhost:3000/v1/muestra/${data}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Eliminar una muestra y sus imágenes
export let deleteMuestra = async (id) => {
  try {
    let response = await fetch(`http://localhost:3000/v1/muestra/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      }
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Subir una imagen a una muestra
export let createImagen = async (img, id) => {
  let formData = new FormData();
  formData.append("imagen", img);

  try {
    let response = await fetch(`http://localhost:3000/v1/imagen/${id}`, {
      method: "POST",
      headers: {
        "user-token": sessionStorage.getItem('user-token')
      },
      body: formData,
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Eliminar una imagen de una muestra
export let deleteImagen = async (id) => {
  try {
    let response = await fetch(`http://localhost:3000/v1/imagen/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "user-token": sessionStorage.getItem('user-token')
      }
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};