$('#botonConfiguracion').bind("click", () => $("#configuracionPartida").slideToggle("slow"));
$('#botonCombinacionCorrecta').bind("click", () => $("#contenedorCombinacionCorrecta").slideToggle("slow"));
$('#nuevoJuegoLeyenda').bind("click", () => iniciarJuego());
$('#botonNuevaConf').bind("click", () => establecerNuevaConf());
$('#botonSumar').bind("click", () => aniadirColor());
$('#botonRestar').bind("click", () => quitarColor());
$('#checkboxRepeticiones').bind("click", () => {
    if ($('#checkboxRepeticiones').prop('checked')) $("#checkboxRepeticiones").next().text("Repeticiones activadas");
    else $("#checkboxRepeticiones").next().text("Repeticiones desactivadas");
});
$('#botonEstablecerCombinacionCorrecta').bind("click", () => {
    let combinacionCorrecta = [];
    $("#slotsCombCorrecta").children().each(function () {
        if ($(this).children()[0] != undefined) {
            let color = convertirAHex($(this).children()[0].style.backgroundColor);
            combinacionCorrecta.push(color);
        } else combinacionCorrecta.push(null);
    });
    if (!combinacionCorrecta.includes(null)) {
        iniciarJuego(juegoEnCurso.coloresJuego, juegoEnCurso.intentosIniciales, juegoEnCurso.cantidadSlots, juegoEnCurso.repeticiones, combinacionCorrecta);
        $("contenedorCombinacionCorrecta").hide();
        $("botonCombinacionCorrecta").prop('disabled', true);
    }
});

$("#opciones").bind({
    "dragstart": function (e) {
        let target = $(e.target)[0];
        if (target.draggable == true) e.originalEvent.dataTransfer.setData('text/plain', target.id);
    }
})

$("#slotsCombCorrecta").bind({
    "dragstart": function (e) {
        let target = $(e.target)[0];
        if (target.draggable == true) e.originalEvent.dataTransfer.setData('text/plain', target.id);
    },
    "drop": function (e) {
        let target = $(e.target);
        let idColor = e.originalEvent.dataTransfer.getData("text");
        let coloresUsados = [];
        $("#slotsCombCorrecta").children().each(function () {
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

$("#intentos").bind({
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