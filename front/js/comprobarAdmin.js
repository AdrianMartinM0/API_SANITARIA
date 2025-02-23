const adminBtn = document.getElementById('Admin');

document.addEventListener('DOMContentLoaded', async () => {
    const token = sessionStorage.getItem('user-token');
    if (!token)
        return location.href = './../index.html';
    const response = await fetch('http://localhost:3000/v1/usuario/info/admin', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "user-token": sessionStorage.getItem('user-token')
        }
    });
    // console.log(token)
    const data = await response.json();
    if (!data.admin)
        location.href = "./dashboard.html";
})