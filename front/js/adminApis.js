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

const cargaUsu = async () => {
    const response = await fetch('http://localhost:3000/v1/usuario/',{
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "user-token" : sessionStorage.getItem('user-token'),
        }
    });
    const data = await response.json();
    createTableRow(data)
}

const createTableRow = async (data) => {
    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-blue-50';

        const tdFirstName = document.createElement('td');
        tdFirstName.className = 'p-1';
        tdFirstName.textContent = item.nombre;
        tr.appendChild(tdFirstName);

        const tdLastName = document.createElement('td');
        tdLastName.className = 'p-1';
        tdLastName.textContent = item.apellidos;
        tr.appendChild(tdLastName);

        const tdEmail = document.createElement('td');
        tdEmail.className = 'p-1';
        tdEmail.textContent = item.email;
        tr.appendChild(tdEmail);

        const tdSchool = document.createElement('td');
        tdSchool.className = 'p-1';
        tdSchool.textContent = item.centro;
        tr.appendChild(tdSchool);

        const tdRole = document.createElement('td');
        tdRole.className = 'p-1';
        tdRole.textContent = item.admin? 'Admin' : 'Alumno';
        tr.appendChild(tdRole);

        const tdActions = document.createElement('td');
        tdActions.className = 'p-1 text-center';

        const deleteButton = document.createElement('button');
        deleteButton.value = item.id;
        deleteButton.id = "delete";
        deleteButton.innerHTML = `
            <svg stroke-width="1" class="h-5 w-5 text-blue-400 hover:text-blue-900"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
            </svg>`;
        tdActions.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.value = item.id;
        editButton.id = "edit";
        editButton.innerHTML = `
            <svg stroke-width="1" class="h-5 w-5 text-blue-400 hover:text-blue-900"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                <line x1="16" y1="5" x2="19" y2="8" />
            </svg>`;
        tdActions.appendChild(editButton);

        const increaseButton = document.createElement('button');
        increaseButton.value = item.id;
        increaseButton.id = "rol";
        increaseButton.innerHTML = `
            <svg stroke-width="1" class="h-5 w-5 text-blue-400 hover:text-blue-900"
            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
            </svg>`;
        tdActions.appendChild(increaseButton);

        tr.appendChild(tdActions);
        fragment.appendChild(tr);
    });
    tbodyUsuarios.innerHTML = '';
    tbodyUsuarios.appendChild(fragment);
};
let numUser;
const deleteOneUser = async () => {
    await fetch(`http://localhost:3000/v1/usuario/one/${numUser}`,{
        method: 'DELETE',
        headers: {
            "Content-Type" : "application/json",
            "user-token" : sessionStorage.getItem('user-token'),
        }
    });
    cargaUsu();
    document.getElementById('delete__alumnoModal').classList.add('d-none')
}

const editOneUser = async (event) => {
    event.preventDefault();
    document.getElementById('edit__alumnoModal').classList.add('d-none');
    const userData = {
        nombre: nombreUser.value,
        apellidos: apellidosUser.value,
        centro: centroUser.value,
        email: correoUser.value,
    };
    nombreUser.value = "",
    apellidosUser.value = "",
    centroUser.value = "",
    correoUser.value = "Instituto Bonanova Formación Profesional Sanitaria",
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
    if(event.target.parentElement.nodeName == 'BUTTON'){
        numUser = event.target.parentElement.value;
        if(event.target.parentElement.id == 'delete')
            document.getElementById('delete__alumnoModal').classList.remove('d-none')
        if(event.target.parentElement.id == 'edit')
            document.getElementById('edit__alumnoModal').classList.remove('d-none')
        if(event.target.parentElement.id == 'rol')
            document.getElementById('rol__alumnoModal').classList.remove('d-none')
    }
}

returnDahsboard.addEventListener('click', () => location.href="./dashboard.html");
logOutAdmin.addEventListener('click', () => {
    sessionStorage.removeItem('user-token')
    location.reload();
});
document.addEventListener('DOMContentLoaded', cargaUsu)
tbodyUsuarios.addEventListener('click', acciones);
btnEliminar.addEventListener('click', deleteOneUser);
btnEditar.addEventListener('click', editOneUser);
btnRol.addEventListener('click', promocionar);