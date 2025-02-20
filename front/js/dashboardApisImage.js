

 export let CreateImage = async (idMuestra , fileImage) => {
    try {
        let formData = new FormData();
        formData.append('MuestraId', idMuestra);
        formData.append('imagen', fileImage);

        let response = await fetch(`http://localhost:3000/v1/imagen/`, {
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
}


export let showallimages = async (idMuestra) => {
    try {
        let response = await fetch(`http://localhost:3000/v1/imagen/${idMuestra}`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "user-token": sessionStorage.getItem('user-token')
            }
        });
        const datas = await response.json();
        
        // Crear un array para almacenar las URLs de las imágenes
        const urls = datas.map(data => {
            let buffer = data.imagen.data;
            const blob = new Blob([new Uint8Array(buffer)], { type: 'image/jpeg' });
            return URL.createObjectURL(blob);
        });
        
        // Devolver las URLs de las imágenes
        return urls;
        
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        return false;
    }
}


