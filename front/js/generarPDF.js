const btnGenerate = document.getElementById('generatePDFButton');

const cargarCassetes = async () => {
    try {
        let cassettes = await fetch("http://localhost:3000/v1/cassette", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token')
          }
        });
      
        const cas = await cassettes.json();
        const casetes = await Promise.all(cas.map(async (cassette) => {
            try {
                let muestras = await fetch(`http://localhost:3000/v1/cassette/${cassette.id}`, {
                    method: "GET",
                    headers: { 
                      "Content-Type": "application/json",
                      "user-token": sessionStorage.getItem('user-token')
                    }
                  });
                    const data = await muestras.json();
                    return data;
            } catch (error) {
                console.error('Error fetching cassettes:', error);
                return false;
            }
        }));
        return casetes;
    
      } catch (error) {
        console.error('Error fetching cassettes:', error);
        return false;
      }
}

const generarPdf = async () => {
    const cassettes = await cargarCassetes();
    const options = {
        filename: `reporte_cassettes_${new Date().toLocaleString('es-ES', { hour12: false }).replace(/[:\s]/g, '-').replace(',', '')}.pdf`,
    };
    console.log(cassettes)
    // Crear el contenedor dinámicamente
    const contentDiv = document.createElement('div');
    contentDiv.id = 'pdfContent';
    document.body.appendChild(contentDiv); // Añadirlo al cuerpo del documento

    contentDiv.innerHTML = ''; // Limpiar el contenido anterior

    cassettes.forEach(cassette => {
        const cassetteDiv = document.createElement('div');
        cassetteDiv.classList.add('p-4', 'm-4', 'bg-blue-100', 'rounded-lg', 'shadow-md');

        const title = document.createElement('h3');
        title.classList.add('text-xl', 'font-bold', 'mb-2', 'text-blue-800');
        title.textContent = `Cassette ID: ${cassette.id}`;
        cassetteDiv.appendChild(title);

        const caracteristicas = document.createElement('p');
        caracteristicas.textContent = `Características: ${cassette.caracteristicas}`;
        cassetteDiv.appendChild(caracteristicas);

        const descripcion = document.createElement('p');
        descripcion.textContent = `Descripción: ${cassette.descripcion}`;
        cassetteDiv.appendChild(descripcion);

        const fecha = document.createElement('p');
        fecha.textContent = `Fecha: ${cassette.fecha.split('T')[0]}`;
        cassetteDiv.appendChild(fecha);

        const organo = document.createElement('p');
        organo.textContent = `Órgano: ${cassette.organo}`;
        cassetteDiv.appendChild(organo);

        const observaciones = document.createElement('p');
        observaciones.textContent = `Observaciones: ${cassette.observaciones}`;
        cassetteDiv.appendChild(observaciones);

        const identificadorCassette = document.createElement('p');
        identificadorCassette.textContent = `Identificador Cassette: ${cassette.identificador_cassette}`;
        identificadorCassette.classList.add('mb-4')
        cassetteDiv.appendChild(identificadorCassette);

        if (cassette.Muestras && cassette.Muestras.length > 0) {
            cassette.Muestras.forEach(muestra => {
                const muestraDiv = document.createElement('div');
                muestraDiv.classList.add('p-2', 'mb-2', 'bg-gray-100', 'rounded-lg', 'shadow-sm', 'w-full');

                const muestraId = document.createElement('h4');
                muestraId.textContent = `Muestra ID: ${muestra.id}`;
                muestraId.classList.add('text-md', 'font-bold', 'text-blue-600');
                muestraDiv.appendChild(muestraId);

                const muestraDescripcion = document.createElement('p');
                muestraDescripcion.textContent = `Descripción: ${muestra.descripcion}`;
                muestraDiv.appendChild(muestraDescripcion);

                const muestraFecha = document.createElement('p');
                muestraFecha.textContent = `Fecha: ${muestra.fecha.split('T')[0]}`;
                muestraDiv.appendChild(muestraFecha);

                const muestraObservaciones = document.createElement('p');
                muestraObservaciones.textContent = `Observaciones: ${muestra.observaciones}`;
                muestraDiv.appendChild(muestraObservaciones);

                const muestraTincion = document.createElement('p');
                muestraTincion.textContent = `Tinción: ${muestra.tincion}`;
                muestraDiv.appendChild(muestraTincion);

                cassetteDiv.appendChild(muestraDiv);

                // Añadir una separación clara entre muestras
                const separator = document.createElement('hr');
                separator.style.margin = '20px 0';
                cassetteDiv.appendChild(separator);
            });
        } else {
            const noMuestrasDiv = document.createElement('div');
            noMuestrasDiv.classList.add('p-2', 'mb-2', 'bg-gray-100', 'rounded-lg', 'shadow-sm');
            noMuestrasDiv.textContent = 'No hay muestras para este cassette.';
            cassetteDiv.appendChild(noMuestrasDiv);
        }

        contentDiv.appendChild(cassetteDiv);
    });

    // Mostrar el contenido a convertir
    contentDiv.style.display = 'block';

    // // Generar el PDF
    html2pdf().from(contentDiv).set(options).save().then(() => {
        // Eliminar el contenedor después de generar el PDF
        document.body.removeChild(contentDiv);
    });
}

// btnGenerate.addEventListener('click', generarPdf)
btnGenerate.addEventListener('click', generarPdf);