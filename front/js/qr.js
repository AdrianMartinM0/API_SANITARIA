const btn__mostrarQR = document.getElementById("btn__mostrarQR");
const btn__generarQR = document.getElementById("btn__generarQR");
const btn__muestrasQR = document.getElementById("btn__muestrasQR");

const show__QRModal = document.getElementById("show__QRModal");
const close__btn__QR = document.getElementById("close__btn__QR");

const codeQR = document.getElementById("code__QR");

const showQR =() => {
    show__QRModal.classList.remove("d-none");
}

const closeQR = () => {
    show__QRModal.classList.add("d-none");
}

//LISTENER
btn__mostrarQR.addEventListener("click", showQR);
btn__generarQR.addEventListener("click", showQR);
btn__muestrasQR.addEventListener("click", showQR);
close__btn__QR.addEventListener("click", closeQR);