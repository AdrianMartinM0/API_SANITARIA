

document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('user-token');
    if(!token)
        location.href='./../index.html';
})