const returnDahsboard = document.getElementById('returnDashboard');
const logOutAdmin = document.getElementById('logOut__admin');
const tbodyUsuarios = document.getElementById('tbodyUsuarios');
const btnEliminar = document.getElementById('btnDelete__alumnoModal');
const btnEditar = document.getElementById('btnEdit__alumnoModal');
const btnRol = document.getElementById('btnRol__alumnoModal');
const nombreUser = document.getElementById('nombreAlumno__edit');
const apellidosUser = document.getElementById('apellidosAlumno__edit');
const correoUser = document.getElementById('correoAlumno__edit');
const centroUser = document.getElementById('centroAlumno__edit');
const btnAllCassettes = document.getElementById('btnDelete__allCassettesModal');
const btnAllMuestras = document.getElementById('btnDelete__allMuestrasModal');
const btnAllImages = document.getElementById('btnDelete__allImagesModal');
const btnAllAlumnos = document.getElementById('btnDelete__allAlumnosModal');

const cargaUsu = async () => {
    const response = await fetch('http://localhost:3000/v1/usuario/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token'),
        }
    });
    const data = await response.json();
    createTableRow(data)
}

const createTableRow = async (data) => {
    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-blue-50 dark:hover:bg-gray-700';

        const tdFirstName = document.createElement('td');
        tdFirstName.className = 'p-1 text-left hidden sm:table-cell';
        tdFirstName.textContent = item.nombre;
        tr.appendChild(tdFirstName);

        const tdLastName = document.createElement('td');
        tdLastName.className = 'p-1 text-left hidden lg:table-cell';
        tdLastName.textContent = item.apellidos;
        tr.appendChild(tdLastName);

        const tdEmail = document.createElement('td');
        tdEmail.className = 'p-1 text-left';
        tdEmail.textContent = item.email;
        tr.appendChild(tdEmail);

        const tdSchool = document.createElement('td');
        tdSchool.className = 'p-1 text-left hidden lg:table-cell';
        tdSchool.textContent = item.centro;
        tr.appendChild(tdSchool);

        const tdRole = document.createElement('td');
        tdRole.className = 'p-1 text-left hidden sm:table-cell';
        tdRole.textContent = item.admin ? 'Admin' : 'Alumno';
        tr.appendChild(tdRole);

        const tdActions = document.createElement('td');
        tdActions.className = 'p-1 text-center';

        const deleteButton = document.createElement('button');
        deleteButton.value = item.id;
        deleteButton.id = "delete";
        deleteButton.innerHTML = `
            <svg stroke-width="1" class="h-5 w-5 text-blue-400 hover:text-blue-900 dark:hover:text-blue-200"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
            </svg>`;
        if (localStorage.getItem('usuario') == item.id)
            deleteButton.classList.add('hidden');
        tdActions.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.value = item.id;
        editButton.id = "edit";
        editButton.innerHTML = `
            <svg stroke-width="1" class="h-5 w-5 text-blue-400 hover:text-blue-900 dark:hover:text-blue-200"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                <line x1="16" y1="5" x2="19" y2="8" />
            </svg>`;
        tdActions.appendChild(editButton);

        if (!item.admin) {
            const increaseButton = document.createElement('button');
            increaseButton.value = item.id;
            increaseButton.id = "rol";
            increaseButton.innerHTML = `
                <svg stroke-width="1" class="h-5 w-5 text-blue-400 hover:text-blue-900 dark:hover:text-blue-200"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
                </svg>`;
            tdActions.appendChild(increaseButton);
        }

        tr.appendChild(tdActions);
        fragment.appendChild(tr);
    });
    tbodyUsuarios.innerHTML = '';
    tbodyUsuarios.appendChild(fragment);
};

let numUser;
const deleteOneUser = async () => {
    await fetch(`http://localhost:3000/v1/usuario/one/${numUser}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token'),
        }
    });
    cargaUsu();
    document.getElementById('delete__alumnoModal').classList.add('d-none')
}

//VALIDAR FORM
const createErrorElement = (input) => {
    let error = document.createElement("span");
    error.classList.add("error-message", "hidden");
    error.style.color = "red";
    error.style.fontSize = "12px";
    input.after(error);
    return error;
};

const errorNombre = createErrorElement(nombreUser);
const errorApellidos = createErrorElement(apellidosUser);
const errorCorreo = createErrorElement(correoUser);
const errorCentro = createErrorElement(centroUser);

const hideAllErrors = () => {
    document.querySelectorAll(".error-message").forEach(error => error.classList.add("hidden"));
};

const showFirstError = (input, errorElement, message) => {
    hideAllErrors();
    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
    input.focus();
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validUser = () => {
    hideAllErrors();

    if (nombreUser.value.trim() === "") {
        return showFirstError(nombreUser, errorNombre, "El nombre es obligatorio.");
    }

    if (apellidosUser.value.trim() === "") {
        return showFirstError(apellidosUser, errorApellidos, "Los apellidos son obligatorios.");
    }

    if (correoUser.value.trim() === "") {
        return showFirstError(correoUser, errorCorreo, "El correo es obligatorio.");
    }

    if (!emailRegex.test(correoUser.value.trim())) {
        return showFirstError(correoUser, errorCorreo, "El correo no tiene un formato válido.");
    }

    if (centroUser.value.trim() === "") {
        return showFirstError(centroUser, errorCentro, "Debe seleccionar un centro.");
    }
    return true;
};

const editOneUser = async (event) => {
    event.preventDefault();
    const isValid = validUser();
    if (!isValid)
        return;
    document.getElementById('edit__alumnoModal').classList.add('d-none');
    const userData = {
        nombre: nombreUser.value,
        apellidos: apellidosUser.value,
        centro: centroUser.value,
        email: correoUser.value,
    };


    await fetch(`http://localhost:3000/v1/usuario/update/${numUser}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token'),
        },
        body: JSON.stringify(userData)
    });

    await cargaUsu();
}

const promocionar = async (event) => {
    event.preventDefault();
    document.getElementById('rol__alumnoModal').classList.add('d-none');
    await fetch(`http://localhost:3000/v1/usuario/rol/${numUser}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token'),
        }
    });
    await cargaUsu();
}

const acciones = (event) => {
    if (event.target.parentElement.nodeName == 'BUTTON') {
        numUser = event.target.parentElement.value;
        if (event.target.parentElement.id == 'delete')
            document.getElementById('delete__alumnoModal').classList.remove('d-none')
        if (event.target.parentElement.id == 'edit')
            document.getElementById('edit__alumnoModal').classList.remove('d-none')

        if (event.target.parentElement.id == 'rol')
            document.getElementById('rol__alumnoModal').classList.remove('d-none')
    }

    if (event.target.parentElement.id == 'edit') {
        console.log(event.target.parentElement.value)
        console.log(numUser)
        putvalue(event.target.parentElement.value)
    }


}

const eliminarAllCassettes = async (event) => {
    event.preventDefault();
    document.getElementById('delete__allCassettesModal').classList.add('d-none')
    await fetch('http://localhost:3000/v1/cassette', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token'),
        }
    });
}

const eliminarAllMuestras = async (event) => {
    event.preventDefault();
    document.getElementById('delete__allMuestrasModal').classList.add('d-none')
    await fetch('http://localhost:3000/v1/muestra', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token'),
        }
    });
}

const eliminarAllImages = async (event) => {
    event.preventDefault();
    document.getElementById('delete__allImagesModal').classList.add('d-none')
    await fetch('http://localhost:3000/v1/imagen/all', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token'),
        }
    });
}

const eliminarAllAlumnos = async (event) => {
    event.preventDefault();
    document.getElementById('delete__allAlumnosModal').classList.add('d-none')
    await fetch('http://localhost:3000/v1/usuario/', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token'),
        }
    });
    await cargaUsu();
}

const putvalue = async (id) => {
    const response = await fetch(`http://localhost:3000/v1/usuario/id/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token'),
        }
    });
    console.log(response);

    let data = await response.json();
    nombreUser.value = data.nombre,
        apellidosUser.value = data.apellidos,
        centroUser.value = data.centro,
        correoUser.value = data.email
}

//LISTENER
returnDahsboard.addEventListener('click', () => location.href = "./dashboard.html");
logOutAdmin.addEventListener('click', () => {
    sessionStorage.removeItem('user-token')
    location.reload();
});
document.addEventListener('DOMContentLoaded', cargaUsu)
tbodyUsuarios.addEventListener('click', acciones);
btnEliminar.addEventListener('click', deleteOneUser);
btnEditar.addEventListener('click', editOneUser);
btnRol.addEventListener('click', promocionar);
btnAllCassettes.addEventListener('click', eliminarAllCassettes);
btnAllMuestras.addEventListener('click', eliminarAllMuestras);
btnAllImages.addEventListener('click', eliminarAllImages);
btnAllAlumnos.addEventListener('click', eliminarAllAlumnos);