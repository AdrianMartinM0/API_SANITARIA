const new__cassette = document.getElementById("new__cassette");
const new__cassetteModal = document.getElementById("new__cassetteModal");
const close__btn = document.getElementById("close__btn");

const delete__cassette = document.getElementById("delete__cassette");
const delete__cassetteModal = document.getElementById("delete__cassetteModal");
const close__btn__delete = document.getElementById("close__btn__delete");

const edit__cassette = document.getElementById("edit__cassette");
const edit__cassetteModal = document.getElementById("edit__cassetteModal");
const close__btn__edit = document.getElementById("close__btn__edit");

const new__muestra = document.getElementById("new__muestra");
const new__muestraModal = document.getElementById("new__muestraModal");
const close__btn__newMuestra = document.getElementById("close__btn__newMuestra");

const detail__muestra = document.getElementById("detail__muestra");
const detail__muestraModal = document.getElementById("detail__muestraModal");
const close__btn__detailMuestra = document.getElementById("close__btn__detailMuestra");

const delete__muestra = document.getElementById("delete__muestra");
const delete__muestraModal = document.getElementById("delete__muestraModal");
const close__btn__deleteMuestra = document.getElementById("close__btn__deleteMuestra");

const edit__muestra = document.getElementById("edit__muestra");
const edit__muestraModal = document.getElementById("edit__muestraModal");
const close__btn__editMuestra = document.getElementById("close__btn__editMuestra");

const showModal = (event) => {
    if (event.target.id == "delete__cassette" || event.target.id == "edit__cassette" || event.target.id == "new__muestra") {
        errorCassette();
        if (!localStorage.getItem("cassette"))
            return;
    }
    const modalId = event.target.id + "Modal";
    document.getElementById(modalId).classList.remove("d-none");
};

const closeModal = (event) => {
    const closeId = event.target.parentNode.parentNode.id;
    document.getElementById(closeId).classList.add("d-none");
};

new__cassette.addEventListener("click", showModal);
close__btn.addEventListener("click", closeModal);

delete__cassette.addEventListener("click", showModal);
close__btn__delete.addEventListener("click", closeModal);

edit__cassette.addEventListener("click", showModal);
close__btn__edit.addEventListener("click", closeModal);

new__muestra.addEventListener("click", showModal);
close__btn__newMuestra.addEventListener("click", closeModal);

detail__muestra.addEventListener("click", showModal);
close__btn__detailMuestra.addEventListener("click", closeModal);

delete__muestra.addEventListener("click", showModal);
close__btn__deleteMuestra.addEventListener("click", closeModal);

edit__muestra.addEventListener("click", showModal);
close__btn__editMuestra.addEventListener("click", closeModal);

const errorCassette = () => {
    if (localStorage.getItem('cassette') == null) {
        notifier.warning("Selecciona antes un cassette");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (typeof AWN === "undefined") {
        console.error("Awesome Notifications no se ha cargado correctamente.");
    } else {
        console.log("Awesome Notifications cargado correctamente.");

        notifier = new AWN();
    }
});