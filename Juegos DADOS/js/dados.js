function mostrarDados(dados, id) {
    let dadosHTML = '';
    dados.forEach((dado, index) => {
        // Generar la animación con un pequeño retraso entre cada dado
        const delay = index * 0.2; // Retraso de 0.2 segundos entre cada dado
        dadosHTML += `<img src="img/dados/${dado}.svg" class="dado" style="animation-delay: ${delay}s">`;
    });
    document.getElementById(id).innerHTML = dadosHTML;
}
