// Script para manejar el menú desplegable
const hamburgerButton = document.getElementById('hamburgerButton');
const filtersMenu = document.getElementById('filtersMenu');

// Función para mostrar u ocultar el menú según el tamaño de la ventana
const handleResize = () => {
  // Si el tamaño es sm o superior, aseguramos que el menú esté visible
  if (window.innerWidth >= 1024) {
    filtersMenu.classList.remove('hidden');
  } else {
    filtersMenu.classList.add('hidden');
  }
};

// Añadimos el evento para el cambio de tamaño de la ventana
window.addEventListener('resize', handleResize);

// Inicializamos el estado según el tamaño de la ventana
handleResize();

// Evento para el botón hamburguesa
hamburgerButton.addEventListener('click', () => {
  filtersMenu.classList.toggle('hidden');
});