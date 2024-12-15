document.getElementById('form-dados').addEventListener('submit', (e) => {
    e.preventDefault();
    const cantidadDados = parseInt(document.getElementById('cantidadDados').value);

    if (cantidadDados <= 0) {
        alert('La cantidad de dados debe ser mayor que cero.');
        return;
    }

    const usuario = lanzarDados(cantidadDados);
    const maquina = lanzarDados(cantidadDados);

    mostrarResultados(usuario, maquina);
    guardarHistorial(cantidadDados, usuario, maquina);
});

document.getElementById('verHistorial').addEventListener('click', () => {
    mostrarHistorial();
});

function lanzarDados(cantidad) {
    const resultados = [];
    for (let i = 0; i < cantidad; i++) {
        resultados.push(Math.floor(Math.random() * 6) + 1);
    }
    return resultados;
}

function mostrarResultados(usuario, maquina) {
    const sumaUsuario = usuario.reduce((a, b) => a + b, 0);
    const sumaMaquina = maquina.reduce((a, b) => a + b, 0);

    document.getElementById('resultadoUsuario').textContent = `Usuario: ${usuario.join(', ')} (Suma: ${sumaUsuario})`;
    document.getElementById('resultadoMaquina').textContent = `Máquina: ${maquina.join(', ')} (Suma: ${sumaMaquina})`;

    const ganador = sumaUsuario > sumaMaquina ? 'Usuario' : sumaUsuario < sumaMaquina ? 'Máquina' : 'Empate';
    document.getElementById('ganador').textContent = `Ganador: ${ganador}`;
    document.getElementById('resultados').classList.remove('hidden');
}

function guardarHistorial(cantidad, usuario, maquina) {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const sumaUsuario = usuario.reduce((a, b) => a + b, 0);
    const sumaMaquina = maquina.reduce((a, b) => a + b, 0);
    const ganador = sumaUsuario > sumaMaquina ? 'Usuario' : sumaUsuario < sumaMaquina ? 'Máquina' : 'Empate';

    historial.push({
        cantidad,
        usuario,
        maquina,
        ganador,
    });

    localStorage.setItem('historial', JSON.stringify(historial));
}

function mostrarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const listaHistorial = document.getElementById('listaHistorial');
    listaHistorial.innerHTML = '';

    historial.forEach((partida, index) => {
        const li = document.createElement('li');
        li.textContent = `Partida ${index + 1}: Dados: ${partida.cantidad}, Ganador: ${partida.ganador}, Usuario: ${partida.usuario.join(', ')}, Máquina: ${partida.maquina.join(', ')}`;
        listaHistorial.appendChild(li);
    });

    document.getElementById('historial').classList.remove('hidden');
}
