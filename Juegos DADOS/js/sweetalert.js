// Función para generar los dados visualmente sin animación
function generarDados() {
    cantidadDados = parseInt(document.getElementById('cantidadDados').value);

    if (modalidadSeleccionada === 0) {
        Swal.fire({
            title: 'Error',
            text: 'Debe seleccionar una modalidad antes de lanzar los dados.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const dadosJugador1Div = document.getElementById('dadosJugador1');
    const dadosJugador2Div = document.getElementById('dadosJugador2');
    dadosJugador1Div.innerHTML = '';
    dadosJugador2Div.innerHTML = '';

    for (let i = 0; i < cantidadDados; i++) {
        dadosJugador1Div.innerHTML += `<img src="img/dados/rand.svg" class="dado" id="dadoJugador1_${i}">`;
        dadosJugador2Div.innerHTML += `<img src="img/dados/rand.svg" class="dado" id="dadoJugador2_${i}">`;
    }

    jugar();
}


// Función para jugar la ronda
function jugar() {
    let dadosJugador1 = [];
    let dadosJugador2 = [];

    // Lanzar los dados
    for (let i = 0; i < cantidadDados; i++) {
        dadosJugador1.push(lanzarDado());
        dadosJugador2.push(lanzarDado());
    }

    // Agregar animación a los dados
    agregarAnimacionDados();

    setTimeout(() => {
        // Actualizar los dados con los valores
        actualizarDados(dadosJugador1, dadosJugador2);

        // Eliminar la animación
        quitarAnimacionDados();

        // Calcular las sumas
        const sumaJugador1 = dadosJugador1.reduce((a, b) => a + b, 0);
        const sumaJugador2 = dadosJugador2.reduce((a, b) => a + b, 0);

        // Mostrar las sumas
        document.getElementById('sumaJugador1').innerText = `Suma: ${sumaJugador1}`;
        document.getElementById('sumaJugador2').innerText = `Suma: ${sumaJugador2}`;

        // Determinar el resultado
        let resultado = '';
        if (sumaJugador1 > sumaJugador2) {
            resultado = modalidadSeleccionada === 1 ? '¡Jugador gana!' : '¡Jugador 1 gana!';
            mostrarResultado('success', resultado);
        } else if (sumaJugador1 < sumaJugador2) {
            resultado = modalidadSeleccionada === 1 ? '¡Máquina gana!' : '¡Jugador 2 gana!';
            mostrarResultado('error', resultado);
        } else {
            resultado = '¡Es un empate!';
            mostrarResultado('question', resultado);
        }

        // Guardar el resultado en el historial
        const jugada = `Jugador 1: ${sumaJugador1}, Jugador 2: ${sumaJugador2} - ${resultado}`;
        historialJugadas.push(jugada);

        // Guardar historial en localStorage
        localStorage.setItem('historialJugadas', JSON.stringify(historialJugadas));

        // Actualizar el historial en la interfaz
        actualizarHistorial();
    }, 1500); // Tiempo de espera para la animación de los dados
}

// Función para agregar la animación de los dados
function agregarAnimacionDados() {
    for (let i = 0; i < cantidadDados; i++) {
        document.getElementById(`dadoJugador1_${i}`).classList.add('animarDado');
        document.getElementById(`dadoJugador2_${i}`).classList.add('animarDado');
    }
}

// Función para quitar la animación de los dados
function quitarAnimacionDados() {
    for (let i = 0; i < cantidadDados; i++) {
        document.getElementById(`dadoJugador1_${i}`).classList.remove('animarDado');
        document.getElementById(`dadoJugador2_${i}`).classList.remove('animarDado');
    }
}

// Función para mostrar el resultado usando SweetAlert

// Función para actualizar el historial en la interfaz
function actualizarHistorial() {
    const historialElement = document.getElementById('historial');
    historialElement.innerHTML = '';
    historialJugadas.forEach((jugada, index) => {
        historialElement.innerHTML += `<li class="list-group-item">${index + 1}: ${jugada}</li>`;
    });
}