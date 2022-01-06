DOM.botonConfiguracion.bind("click", () => DOM.configuracionPartida.slideToggle("slow"));
DOM.botonCombinacionCorrecta.bind("click", () => DOM.contenedorCombinacionCorrecta.slideToggle("slow"));
DOM.nuevoJuegoLeyenda.bind("click", () => iniciarJuego());
DOM.botonNuevaConf.bind("click", () => establecerNuevaConf());
DOM.botonSumar.bind("click", () => aniadirColor());
DOM.botonRestar.bind("click", () => quitarColor());
DOM.checkboxRepeticiones.bind("click", () => {
    if (DOM.checkboxRepeticiones.prop('checked')) DOM.checkboxRepeticiones.next().text("Repeticiones activadas");
    else DOM.checkboxRepeticiones.next().text("Repeticiones desactivadas");
});
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
DOM.opciones.bind({
    "dragstart": function (e) {
        let target = $(e.target)[0];
        if (target.draggable == true) e.originalEvent.dataTransfer.setData('text/plain', target.id);
    }
})

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