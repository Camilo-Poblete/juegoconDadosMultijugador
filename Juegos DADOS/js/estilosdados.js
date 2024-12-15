// Función para asegurar que los dados tengan estilo consistente
function aplicarEstiloDados() {
    // Seleccionar todos los elementos <img> que representan los dados
    const dados = document.querySelectorAll('.dado');

    // Recorrer cada dado y aplicar los estilos necesarios
    dados.forEach((dado) => {
        dado.style.backgroundColor = 'white'; // Fondo blanco
        dado.style.border = '1px solid black'; // Borde negro para visibilidad
        dado.style.borderRadius = '5px'; // Bordes ligeramente redondeados
    });
}

// Monitorear cambios en los elementos del DOM para volver a aplicar el estilo
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            aplicarEstiloDados(); // Aplicar estilos cada vez que cambie el DOM
        }
    }
});

// Configuración del observador para monitorear cambios en el DOM
const config = { childList: true, subtree: true, attributes: true };

// Iniciar el observador sobre el cuerpo de la página
observer.observe(document.body, config);

// Aplicar los estilos iniciales cuando la página cargue
document.addEventListener('DOMContentLoaded', aplicarEstiloDados);
