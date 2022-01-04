DOM.opciones.addEventListener("dragstart", (e) => {if (e.target.draggable == true) e.dataTransfer.setData("text/plain", e.target.id)})
DOM.slotsCombCorrecta.addEventListener("dragstart", (e) => {if (e.target.draggable == true) e.dataTransfer.setData("text/plain", e.target.id)})
DOM.intentos.addEventListener("dragstart", (e) => {if (e.target.draggable == true) e.dataTransfer.setData("text/plain", e.target.id)})
DOM.slotsCombCorrecta.addEventListener("dragover", (e) => e.preventDefault())
DOM.intentos.addEventListener("dragover", (e) => e.preventDefault())

DOM.intentos.addEventListener("drop", (e) => {
    let numFila = e.target.closest("#intentos > div").id.slice(7);
    let coloresFila = obtenerColores(numFila);
    let idColor = e.dataTransfer.getData("text");
    if (!(!juegoEnCurso.repeticiones && coloresFila.includes(idColor))) {
        e.preventDefault();
        let colorInsertado = document.getElementById(idColor).cloneNode(true);
        if (e.target.classList.contains("monedaIntento")) e.target.appendChild(colorInsertado);
        else if (e.target.parentNode.classList.contains("monedaIntento")) e.target.parentNode.replaceChild(colorInsertado, e.target);
    }
})

DOM.intentos.addEventListener("click", (e) => {
    if (e.target.nodeName == "INPUT") {
        let numFila = e.target.closest("#intentos > div").id.slice(7);
        juegoEnCurso.comprobarIntento(numFila);
    }
})

DOM.slotsCombCorrecta.addEventListener("drop", (e) => {
    let idColor = e.dataTransfer.getData("text");
    let coloresUsados = [];
    Object.values(DOM.slotsCombCorrecta.children).forEach(slot => {
        if (slot.children[0] != undefined) {
            let color = convertirAHex(slot.children[0].style.backgroundColor);
            coloresUsados.push(color);
        } else coloresUsados.push(null);
    });
    if (!(!juegoEnCurso.repeticiones && coloresUsados.includes(idColor))) {
        e.preventDefault();
        let colorInsertado = document.getElementById(idColor).cloneNode(true);
        if (e.target.classList.contains("monedaIntento")) e.target.appendChild(colorInsertado);
        else if (e.target.parentNode.classList.contains("monedaIntento")) e.target.parentNode.replaceChild(colorInsertado, e.target);
    }
})

$('#botonConfiguracion').click(() => $("#configuracionPartida").toggle());
$('#botonCombinacionCorrecta').click(() => $("#contenedorCombinacionCorrecta").toggle());

$('#botonEstablecerCombinacionCorrecta').click(() => {
    let combinacionCorrecta = [];
    Object.values(DOM.slotsCombCorrecta.children).forEach(slot => {
        if (slot.children[0] != undefined) {
            let color = convertirAHex(slot.children[0].style.backgroundColor);
            combinacionCorrecta.push(color);
        } else combinacionCorrecta.push(null);
    });
    if (!combinacionCorrecta.includes(null)) {
        iniciarJuego(juegoEnCurso.coloresJuego, juegoEnCurso.intentosIniciales, juegoEnCurso.cantidadSlots, juegoEnCurso.repeticiones, combinacionCorrecta);
        DOM.contenedorCombinacionCorrecta.hide();
        DOM.botonCombinacionCorrecta.disabled = true;
    }
});
$('#nuevoJuegoLeyenda').click(() => iniciarJuego());
$('#checkboxRepeticiones').click(() => {
    if (DOM.checkboxRepeticiones.checked) DOM.checkboxRepeticiones.nextElementSibling.innerHTML = "Repeticiones activadas";
    else DOM.checkboxRepeticiones.nextElementSibling.innerHTML = "Repeticiones desactivadas";
});
$('#botonNuevaConf').click(() => establecerNuevaConf());
$('#botonSumar').click(() => aniadirColor());
$('#botonRestar').click(() => quitarColor());