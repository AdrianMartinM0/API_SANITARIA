document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let nombre = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellidos").value.trim();
    let centro = document.getElementById("centro").value;
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

    let isValid = true;

    function showError(id, condition) {
        let errorElement = document.getElementById(id);
        if (condition) {
            errorElement.classList.remove("hidden");
            isValid = false;
        } else {
            errorElement.classList.add("hidden");
        }
    }

    showError("error-nombre", nombre === "");
    showError("error-apellidos", apellidos === "");
    showError("error-centro", centro === "Centro");
    showError("error-email", !emailRegex.test(email));
    showError("error-password", !passwordRegex.test(password));
    showError("error-confirm-password", password !== confirmPassword);

    if (isValid) {
        alert("Formulario enviado correctamente.");
        this.submit();
    }
});