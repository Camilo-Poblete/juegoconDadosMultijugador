let historialJugadas = JSON.parse(localStorage.getItem('historialJugadas')) || [];

const historialElement = document.getElementById('historial');
const loadingElement = document.getElementById('loading');
const filterInput = document.getElementById('filterInput');

loadingElement.style.display = 'none'; // Ocultar el loading cuando cargue el historial

// Función para mostrar el historial
function mostrarHistorial(filtro = '') {
    historialElement.innerHTML = '';
    let filteredJugadas = historialJugadas.filter(jugada => jugada.toLowerCase().includes(filtro.toLowerCase()));

    if (filteredJugadas.length > 0) {
        filteredJugadas.forEach((jugada, index) => {
            historialElement.innerHTML += `<li class="list-group-item">#${index + 1}: <strong>${jugada}</strong></li>`;
        });
    } else {
        historialElement.innerHTML = `<li class="list-group-item">No se encontraron partidas con ese filtro.</li>`;
    }
}

// Filtrar historial al escribir en el input
filterInput.addEventListener('input', () => {
    mostrarHistorial(filterInput.value);
});

// Mostrar historial al cargar la página
mostrarHistorial();
