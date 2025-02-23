const adminBtn = document.getElementById('Admin');

document.addEventListener('DOMContentLoaded', async () => {
    localStorage.removeItem('cassette')
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
    const data = await response.json();
    if (data.admin)
        adminBtn.classList.remove('hidden')
})

adminBtn.addEventListener('click', () => {
    location.href = "./admin.html";
})