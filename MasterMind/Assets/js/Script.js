const DOM = {
    opciones: document.getElementById("opciones"),
    intentos: document.getElementById("intentos"),
    seccionResultado: document.getElementById("seccionResultado"),
    plantillaMonedaEstandar: document.getElementById("plantillaMonedaEstandar"),
    plantillaMonedaSolucion: document.getElementById("plantillaMonedaSolucion"),
    plantillaIntento: document.getElementById("plantillaIntento"),
    plantillaSlots: document.getElementById("plantillaSlots"),
    plantillaMonedaPequenia: document.getElementById("plantillaMonedaPequenia"),
    plantillaPartidaGanada: document.getElementById("plantillaPartidaGanada"),
    plantillaPartidaPerdida: document.getElementById("plantillaPartidaPerdida")
}

const generarColores = () => {
    if (DOM.opciones.innerHTML != "") DOM.opciones.innerHTML = "";
    const fragment = document.createDocumentFragment();
    const template = DOM.plantillaMonedaEstandar.content;

    juegoEnCurso.coloresJuego.forEach(color => {
        template.querySelectorAll("div")[0].id = color;
        template.querySelectorAll("div")[0].style.backgroundColor = color;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    })
    DOM.opciones.appendChild(fragment);
}

const generarIntentos = () => {
    if (DOM.intentos.innerHTML != "") DOM.intentos.innerHTML = "";
    const fragmentIntento = document.createDocumentFragment();
    const fragmentSlot = document.createDocumentFragment();
    const templateIntento = DOM.plantillaIntento.content;
    const templateSlot = DOM.plantillaSlots.content;
    for (let i = 0; i < juegoEnCurso.cantidadSlots; i++) {
        const cloneSlot = templateSlot.cloneNode(true);
        fragmentSlot.appendChild(cloneSlot);
    }
    templateIntento.querySelectorAll("div")[2].innerHTML = "";
    for (let i = 1; i <= juegoEnCurso.cantidadIntentos; i++) {
        templateIntento.querySelectorAll('[id^="intento"]')[0].id = "intento" + i;
        templateIntento.querySelectorAll('[id^="slots"]')[0].id = "slots" + i;
        templateIntento.querySelectorAll('[id^="comprobacion"]')[0].id = "comprobacion" + i;
        templateIntento.querySelectorAll("div")[2].appendChild(fragmentSlot);
        const cloneIntento = templateIntento.cloneNode(true);
        fragmentIntento.appendChild(cloneIntento);
    }
    DOM.intentos.appendChild(fragmentIntento);
}

const mostrarError = (filaIntento) => {
    if (document.getElementById("comprobacion" + filaIntento).children.length == 1) {
        let parrafoError = document.createElement("div");
        parrafoError.innerHTML = "Rellena todos los slots";
        parrafoError.id = "mensajeError" + filaIntento;
        parrafoError.classList.add("error");
        document.getElementById("comprobacion" + filaIntento).appendChild(parrafoError);
        $('#mensajeError' + filaIntento).delay(1000).fadeOut(500);
        setTimeout(() => $('#mensajeError' + filaIntento).remove(), 1500);
    }
}

const mostrarResultado = (filaIntento, cantidadAciertos, cantidadCoincidencias, cantidadFallos) => {
    document.getElementById("comprobacion" + filaIntento).innerHTML = "";
    document.getElementById("comprobacion" + filaIntento).classList.replace("flex-column", "flex-row");
    const fragment = document.createDocumentFragment();
    const template = DOM.plantillaMonedaPequenia.content;
    for (let i = 1; i <= cantidadAciertos; i++) {
        template.querySelectorAll("div")[0].style.backgroundColor = "#0a0a0a";
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    }
    for (let i = 1; i <= cantidadCoincidencias; i++) {
        template.querySelectorAll("div")[0].style.backgroundColor = "white";
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    }
    for (let i = 1; i <= cantidadFallos; i++) {
        template.querySelectorAll("div")[0].style.backgroundColor = "gray";
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    }
    document.getElementById("comprobacion" + filaIntento).appendChild(fragment);
}

const mostrarSolucion = (resultado) => {
    Object.values(DOM.intentos.children).forEach(intento => {
        if (intento.querySelectorAll('input')[0] != null) intento.remove();
    })
    const fragmentMoneda = document.createDocumentFragment();
    const templateMoneda = DOM.plantillaMonedaSolucion.content;
    for (let i = 0; i < juegoEnCurso.cantidadSlots; i++) {
        templateMoneda.querySelectorAll("div")[0].style.backgroundColor = juegoEnCurso.combinacionCorrecta.colores[i];
        const cloneMoneda = templateMoneda.cloneNode(true);
        fragmentMoneda.appendChild(cloneMoneda);
    }
    if (resultado) {
        const fragmentGanada = document.createDocumentFragment();
        const templateGanada = DOM.plantillaPartidaGanada.content;
        templateGanada.querySelectorAll("span")[0].innerHTML = juegoEnCurso.cantidadIntentos;
        templateGanada.querySelector("#slotsSolucion").appendChild(fragmentMoneda);
        const cloneGanada = templateGanada.cloneNode(true);
        fragmentGanada.appendChild(cloneGanada);
        DOM.seccionResultado.appendChild(fragmentGanada);
    } else {
        const fragmentPerdida = document.createDocumentFragment();
        const templatePerdida = DOM.plantillaPartidaPerdida.content;
        templatePerdida.querySelector("#slotsSolucion").appendChild(fragmentMoneda);
        const clonePerdida = templatePerdida.cloneNode(true);
        fragmentPerdida.appendChild(clonePerdida);
        DOM.seccionResultado.appendChild(fragmentPerdida);
    }
}

DOM.opciones.addEventListener("dragstart", (e) => {
    if (e.target.draggable == true) {
        e.dataTransfer.setData("text/plain", e.target.style.backgroundColor);
    }
})

DOM.intentos.addEventListener("dragstart", (e) => {
    if (e.target.draggable == true) {
        e.dataTransfer.setData("text/plain", e.target.style.backgroundColor);
    }
})

DOM.intentos.addEventListener("drop", (e) => {
    e.preventDefault();
    let idColor = e.dataTransfer.getData("text");
    let colorInsertado = document.getElementById(idColor).cloneNode(true);
    if (e.target.classList.contains("monedaIntento")) {
        e.target.appendChild(colorInsertado);
    } else if (e.target.parentNode.classList.contains("monedaIntento")) {
        e.target.parentNode.replaceChild(colorInsertado, e.target);
    }
})

DOM.intentos.addEventListener("dragover", (e) => {
    e.preventDefault();
})

DOM.intentos.addEventListener("click", (e) => {
    if (e.target.nodeName == "INPUT") {
        let numFila = e.target.closest("#intentos > div").id.slice(7);
        juegoEnCurso.comprobarIntento(numFila);
    }
})

$('input[type=button]').click(function () {
    iniciarJuego();
});