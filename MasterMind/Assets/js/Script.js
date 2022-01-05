const DOM = {
    opciones: document.getElementById("opciones"),
    nuevoJuegoLeyenda: document.getElementById("nuevoJuegoLeyenda"),
    botonCombinacionCorrecta: document.getElementById("botonCombinacionCorrecta"),
    contenedorCombinacionCorrecta: $("#contenedorCombinacionCorrecta"),
    slotsCombCorrecta: document.getElementById("slotsCombCorrecta"),
    botonEstablecerCombinacionCorrecta: document.getElementById("botonEstablecerCombinacionCorrecta"),
    intentos: document.getElementById("intentos"),
    seccionResultado: document.getElementById("seccionResultado"),
    coloresConf: document.getElementById("coloresConf"),
    inputIntentos: document.getElementById("inputIntentos"),
    inputSlots: document.getElementById("inputSlots"),
    checkboxRepeticiones: document.getElementById("checkboxRepeticiones"),
    botonNuevaConf: document.getElementById("botonNuevaConf"),
    plantillaMonedaEstandar: document.getElementById("plantillaMonedaEstandar"),
    plantillaMonedaSolucion: document.getElementById("plantillaMonedaSolucion"),
    plantillaIntento: document.getElementById("plantillaIntento"),
    plantillaSlots: document.getElementById("plantillaSlots"),
    plantillaMonedaPequenia: document.getElementById("plantillaMonedaPequenia"),
    plantillaPartidaGanada: document.getElementById("plantillaPartidaGanada"),
    plantillaPartidaPerdida: document.getElementById("plantillaPartidaPerdida")
}

const generarConf = () => {
    DOM.coloresConf.innerHTML = "";
    juegoEnCurso.coloresJuego.forEach(color => {
        $('<input>', {
            type: 'color',
            value: color
        }).appendTo(DOM.coloresConf)
    })
    $("#inputIntentos").val(juegoEnCurso.intentosIniciales);
    $("#inputSlots").val(juegoEnCurso.cantidadSlots);
    if (juegoEnCurso.repeticiones) {
        $("#checkboxRepeticiones").prop("checked", true);
        $("#checkboxRepeticiones").next().text("Repeticiones activadas");
    } else {
        $("#checkboxRepeticiones").prop("checked", false);
        $("#checkboxRepeticiones").next().text("Repeticiones desactivadas");
    }
}

const aniadirColor = () => {
    let coloresMaximos = 10;
    if ($("#coloresConf").children().length < coloresMaximos) {
        let nuevoColor;
        let colores = [];
        $("#coloresConf").children().each(function () { colores.push($(this).val()) });
        do {
            let colorRandom = "rgb(" + generarNumeroAleatorio(0, 255) + "," + generarNumeroAleatorio(0, 255) + "," + generarNumeroAleatorio(0, 255) + ")";
            nuevoColor = convertirAHex(colorRandom);
        } while (colores.includes(nuevoColor));
        $('<input>', {
            type: 'color',
            value: nuevoColor
        }).appendTo(DOM.coloresConf)
    } else mostrarError("errorColores", "No puede haber mas de " + coloresMaximos + " colores");
}

const quitarColor = () => {
    if ($("#coloresConf").children().length > 1) $("#coloresConf").children().last().remove();
    else mostrarError("errorColores", "Tiene que haber como minimo un color");
}

const establecerNuevaConf = () => {
    let configuracionValida = true;
    let colores = [];
    $("#coloresConf").children().each(function () { colores.push($(this).val()) });
    let numIntentos = parseInt($("#inputIntentos").val());
    let numSlots = parseInt($("#inputSlots").val());
    let repeticiones = $("#checkboxRepeticiones").prop("checked");;
    let coloresOrdenados = colores.slice().sort();
    let coloresRepetidos = [];
    for (let i = 0; i < coloresOrdenados.length; i++) if (coloresOrdenados[i + 1] === coloresOrdenados[i] && !coloresRepetidos.includes(coloresOrdenados[i])) coloresRepetidos.push(coloresOrdenados[i]);
    if (coloresRepetidos.length > 0) {
        configuracionValida = false;
        mostrarError("errorColores", "Hay " + coloresRepetidos.length + " colores repetidos");
    }
    if (numIntentos < 1 || typeof numIntentos != "number") {
        configuracionValida = false;
        mostrarError("errorIntentos", "Este valor no es válido");
    }
    if (numSlots < 1 || typeof numSlots != "number") {
        configuracionValida = false;
        mostrarError("errorSlots", "Este valor no es válido");
    }
    if (!repeticiones && numSlots > colores.length) {
        configuracionValida = false;
        mostrarError("errorRepeticiones", "Necesitas mas colores o menos slots para activar las repeticiones");
    }
    if (configuracionValida) iniciarJuego(colores, numIntentos, numSlots, repeticiones);
    else mostrarError("errorConfiguracion", "La configuración introducida no es válida");
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

const generarSlotsCombinacion = () => {
    if (DOM.slotsCombCorrecta.innerHTML != "") DOM.slotsCombCorrecta.innerHTML = "";
    const fragmentSlot = document.createDocumentFragment();
    const templateSlot = DOM.plantillaSlots.content;
    for (let i = 0; i < juegoEnCurso.cantidadSlots; i++) {
        const cloneSlot = templateSlot.cloneNode(true);
        fragmentSlot.appendChild(cloneSlot);
    }
    DOM.slotsCombCorrecta.appendChild(fragmentSlot);
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
    for (let i = 1; i <= juegoEnCurso.intentosIniciales; i++) {
        templateIntento.querySelectorAll('[id^="intento"]')[0].id = "intento" + i;
        templateIntento.querySelectorAll('[id^="slots"]')[0].id = "slots" + i;
        templateIntento.querySelectorAll('[id^="comprobacion"]')[0].id = "comprobacion" + i;
        templateIntento.querySelectorAll("div")[2].appendChild(fragmentSlot);
        const cloneIntento = templateIntento.cloneNode(true);
        fragmentIntento.appendChild(cloneIntento);
    }
    DOM.intentos.appendChild(fragmentIntento);
}

const mostrarError = (contenedorPadre, mensajeError) => {
    let parrafoError = document.createElement("div");
    parrafoError.innerHTML = mensajeError;
    parrafoError.id = "mensajeError";
    parrafoError.classList.add("error");
    document.getElementById(contenedorPadre).appendChild(parrafoError);
    $('#mensajeError').delay(1000).fadeOut(500);
    setTimeout(() => $('#mensajeError').remove(), 1500);
}

const mostrarResultadoIntento = (filaIntento, cantidadAciertos, cantidadCoincidencias, cantidadFallos) => {
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
    Object.values(DOM.intentos.children).forEach(intento => { if (intento.querySelectorAll('input')[0] != null) intento.remove() });
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
        templateGanada.querySelectorAll("span")[0].innerHTML = juegoEnCurso.intentosRestantes;
        templateGanada.querySelector("#slotsSolucion").appendChild(fragmentMoneda);
        const cloneGanada = templateGanada.cloneNode(true);
        templateGanada.querySelector("#slotsSolucion").innerHTML = "";
        fragmentGanada.appendChild(cloneGanada);
        DOM.seccionResultado.appendChild(fragmentGanada);
    } else {
        const fragmentPerdida = document.createDocumentFragment();
        const templatePerdida = DOM.plantillaPartidaPerdida.content;
        templatePerdida.querySelector("#slotsSolucion").appendChild(fragmentMoneda);
        const clonePerdida = templatePerdida.cloneNode(true);
        templatePerdida.querySelector("#slotsSolucion").innerHTML = "";
        fragmentPerdida.appendChild(clonePerdida);
        DOM.seccionResultado.appendChild(fragmentPerdida);
    }
}