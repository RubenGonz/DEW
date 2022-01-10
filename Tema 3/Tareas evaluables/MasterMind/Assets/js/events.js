/* Evento que muestra u oculta la configuracion de la partida */
DOM.botonConfiguracion.bind("click", () => DOM.configuracionPartida.slideToggle("slow"));

/* Evento que muestra u oculta la seccion de la combinacion correcta */
DOM.botonCombinacionCorrecta.bind("click", () => DOM.contenedorCombinacionCorrecta.slideToggle("slow"));

/* Evento que inicia o reinicia un nuevo juego */
DOM.nuevoJuegoLeyenda.bind("click", () => iniciarJuego());

/* Evento que inicia o reinicia un nuevo juego usando la nueva configuracion*/
DOM.botonNuevaConf.bind("click", () => establecerNuevaConf());

/* Evento que aniade un nuevo color a la configuracion */
DOM.botonSumar.bind("click", () => aniadirColor());

/* Evento que elimina un nuevo color a la configuracion */
DOM.botonRestar.bind("click", () => quitarColor());

/* Evento que cambia el contenido del checkbox de la configuracion */
DOM.checkboxRepeticiones.bind("click", () => {
    if (DOM.checkboxRepeticiones.prop('checked')) DOM.checkboxRepeticiones.next().text("Repeticiones activadas");
    else DOM.checkboxRepeticiones.next().text("Repeticiones desactivadas");
});

/* Evento que establece una nueva combinacion correcta si puede */
DOM.botonEstablecerCombinacionCorrecta.bind("click", () => {
    let combinacionCorrecta = [];
    DOM.slotsCombCorrecta.children().each(function () {
        if ($(this).children()[0] != undefined) {
            let color = convertirAHex($(this).children()[0].style.backgroundColor);
            combinacionCorrecta.push(color);
        } else combinacionCorrecta.push(null);
    });
    if (!combinacionCorrecta.includes(null)) {
        iniciarJuego(juegoEnCurso.coloresJuego, juegoEnCurso.intentosIniciales, juegoEnCurso.cantidadSlots, juegoEnCurso.repeticiones, combinacionCorrecta);
        DOM.contenedorCombinacionCorrecta.hide("slow");
        DOM.botonCombinacionCorrecta.prop('disabled', true);
    }
});

/* Evento que permite el arrastrado de las monedas desde las opciones*/
DOM.opciones.bind({
    "dragstart": function (e) {
        let target = $(e.target)[0];
        if (target.draggable == true) e.originalEvent.dataTransfer.setData('text/plain', target.id);
    }
})

/** 
 * Evento que: 
 * - Permite el arrastrado de las monedas desde la combinacion correcta
 * - Permite soltar las monedas en los slots y rellenarlos
*/
DOM.slotsCombCorrecta.bind({
    "dragstart": function (e) {
        let target = $(e.target)[0];
        if (target.draggable == true) e.originalEvent.dataTransfer.setData('text/plain', target.id);
    },
    "drop": function (e) {
        let target = $(e.target);
        let idColor = e.originalEvent.dataTransfer.getData("text");
        let coloresUsados = [];
        DOM.slotsCombCorrecta.children().each(function () {
            if ($(this).children()[0] != undefined) {
                let color = convertirAHex($(this).children()[0].style.backgroundColor);
                coloresUsados.push(color);
            } else coloresUsados.push(null);
        });
        if (!(!juegoEnCurso.repeticiones && coloresUsados.includes(idColor))) {
            e.preventDefault();
            let colorInsertado = $("#opciones div[id$=" + idColor.slice(1) + "]").clone(true);
            if (target.hasClass("monedaIntento")) target.append(colorInsertado);
            else if (target.parent().hasClass("monedaIntento")) target.replaceWith(colorInsertado);
        }
    },
    "dragover": function (e) {
        e.preventDefault();
    }
})

/** 
 * Evento que: 
 * - Permite el arrastrado de las monedas desde los intentos
 * - Permite soltar las monedas en los slots y rellenarlos
 * - Permite comprobar el intento al clickar en el boton
*/
DOM.intentos.bind({
    "dragstart": function (e) {
        let target = $(e.target)[0];
        if (target.draggable == true) e.originalEvent.dataTransfer.setData('text/plain', target.id);
    },
    "drop": function (e) {
        let target = $(e.target);
        let idColor = e.originalEvent.dataTransfer.getData("text");
        let numFila = target.closest("#intentos > div")[0].id.slice(7);
        let coloresFila = obtenerColores(numFila);
        if (!(!juegoEnCurso.repeticiones && coloresFila.includes(idColor))) {
            e.preventDefault();
            let colorInsertado = $("#opciones div[id$=" + idColor.slice(1) + "]").clone(true);
            if (target.hasClass("monedaIntento")) target.append(colorInsertado);
            else if (target.parent().hasClass("monedaIntento")) target.replaceWith(colorInsertado);
        }
    },
    "dragover": function (e) {
        e.preventDefault();
    },
    "click": function (e) {
        let target = $(e.target);
        if (target.prop("nodeName") == "INPUT") {
            let numFila = target.closest("#intentos > div")[0].id.slice(7);
            juegoEnCurso.comprobarIntento(numFila);
        }
    }
})