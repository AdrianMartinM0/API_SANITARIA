//NAV
const delete__allCassettes = document.getElementById("delete__allCassettes");
const delete__allMuestras = document.getElementById("delete__allMuestras");
const delete__allImages = document.getElementById("delete__allImages");
const returnDashboard = document.getElementById("returnDashboard");
const logOut__admin = document.getElementById("logOut__admin");

// TABLA ALUMNOS
const delete__allAlumnos = document.getElementById("delete__allAlumnos");
const delete__alumno = document.getElementById("delete__alumno");
const edit__alumno = document.getElementById("edit__alumno");

//MODAL ELIMINAR TODOS LOS CASSETTES
const delete__allCassettesModal = document.getElementById("delete__allCassettesModal");
const close__allCassettesModal = document.getElementById("close__allCassettesModal");
const btnDelete__allCassettesModal = document.getElementById("btnDelete__allCassettesModal");

//MODAL ELIMINAR TODAS LAS MUESTRAS
const delete__allMuestrasModal = document.getElementById("delete__allMuestrasModal");
const close__allMuestrasModal = document.getElementById("close__allMuestrasModal");
const btnDelete__allMuestrasModal = document.getElementById("btnDelete__allMuestrasModal");

//MODAL ELIMINAR TODAS LAS IMAGENES
const delete__allImagesModal = document.getElementById("delete__allImagesModal");
const close__allImagesModal = document.getElementById("close__allImagesModal");
const btnDelete__allImagesModal = document.getElementById("btnDelete__allImagesModal");

//MODAL ELIMINAR TODOS LOS ALUMNOS
const delete__allAlumnosModal = document.getElementById("delete__allAlumnosModal");
const close__allAlumnosModal = document.getElementById("close__allAlumnosModal");
const btnDelete__allAlumnosModal = document.getElementById("btnDelete__allAlumnosModal");

//MODAL ELIMINAR UN ALUMNO
const delete__alumnoModal = document.getElementById("delete__alumnoModal");
const close__alumnoModal = document.getElementById("close__alumnoModal");
const close__alumnoModalPromo = document.getElementById("close__alumnoModalPromo");
const btnDelete__alumnoModal = document.getElementById("btnDelete__alumnoModal");

//MODAL MODIFICAR UN ALUMNO
const edit__alumnoModal = document.getElementById("edit__alumnoModal");
const close__editAlumno = document.getElementById("close__editAlumno");
const form__editAlumno = document.getElementById("form__editAlumno");
const nombreAlumno__edit = document.getElementById("nombreAlumno__edit");
const apellidosAlumno__edit = document.getElementById("apellidosAlumno__edit");
const correoAlumno__edit = document.getElementById("correoAlumno__edit");
const centroAlumno__edit = document.getElementById("centroAlumno__edit");
const rolAlumno__edit = document.getElementById("rolAlumno__edit");

//SHOW MODALS
const showModal = (event) => {
    const modalId = event.target.id + "Modal";
    document.getElementById(modalId)?.classList.remove("d-none");
};

const closeModal = (event) => {
    const closeId = event.target.parentNode.parentNode.id;
    document.getElementById(closeId)?.classList.add("d-none");
};

//LISTENER
delete__allCassettes.addEventListener("click", showModal);
close__allCassettesModal.addEventListener("click", closeModal);

delete__allMuestras.addEventListener("click", showModal);
close__allMuestrasModal.addEventListener("click", closeModal);

delete__allImages.addEventListener("click", showModal);
close__allImagesModal.addEventListener("click", closeModal);

delete__allAlumnos.addEventListener("click", showModal);
close__allAlumnosModal.addEventListener("click", closeModal);

// delete__alumno.addEventListener ("click", showModal);
close__alumnoModal.addEventListener("click", closeModal);
close__alumnoModalPromo.addEventListener("click", closeModal);

// edit__alumno.addEventListener ("click", showModal);
close__editAlumno.addEventListener("click", closeModal);

const cargarSortable = () => {
    const headers = document.querySelectorAll("thead th");
    const tbody = document.querySelector("tbody");

    if (!tbody) return;

    headers.forEach((header, index) => {
        // Evita que la última columna vacía sea ordenable
        if (index === headers.length - 1) return;

        header.style.cursor = "pointer";
        header.addEventListener("click", () => {
            sortTableByColumn(tbody, index);
        });
    });

    function sortTableByColumn(tbody, columnIndex) {
        const rows = Array.from(tbody.querySelectorAll("tr"));
        const isAscending = tbody.getAttribute("data-sort-order") !== "asc";
        tbody.setAttribute("data-sort-order", isAscending ? "asc" : "desc");

        rows.sort((rowA, rowB) => {
            const cellA = rowA.children[columnIndex]?.textContent.trim().toLowerCase() || "";
            const cellB = rowB.children[columnIndex]?.textContent.trim().toLowerCase() || "";

            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        });

        rows.forEach((row) => tbody.appendChild(row));
    }

    // Activar Sortable.js en el tbody para permitir el drag & drop manual de filas
    new Sortable(tbody, {
        animation: 150,
        ghostClass: "sortable-ghost",
        handle: "td",
    });
};

// Llamar a la función después de que el DOM haya cargado
document.addEventListener("DOMContentLoaded", cargarSortable);  