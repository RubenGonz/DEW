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
        $("<input>", {
            type: "color", value: color
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
        $("<input>", {
            type: "color", value: nuevoColor
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
    if (!$('#opciones').is(':empty')) $("#opciones").empty();
    juegoEnCurso.coloresJuego.forEach(color => {
        $("<div>", {
            id: color,
            draggable: "true",
            class: "tamanioMoneda rounded-circle",
            style: "background-image: url('Assets/img/Coin.png'); background-size: cover; background-color:" + color + ";"
        }).appendTo(DOM.opciones)
    })
}

const generarSlotsCombinacion = () => {
    if (!$('#slotsCombCorrecta').is(':empty')) $("#slotsCombCorrecta").empty();
    for (let i = 0; i < juegoEnCurso.cantidadSlots; i++) {
        $("<div>", {
            class: "tamanioMoneda rounded-circle monedaIntento",
        }).appendTo(DOM.slotsCombCorrecta)
    }
}

const generarIntentos = () => {
    if (!$('#intentos').is(':empty')) $("#intentos").empty();
    for (let i = 1; i <= juegoEnCurso.intentosIniciales; i++) {
        $("<div>", {
            id: "intento" + i, class: "row py-2"
        }).append([
            $("<div>", {
                class: "col-8 px-1"
            }).append(
                $("<div>", {
                    id: "slots" + i, class: "d-flex flex-wrap justify-content-around w-100"
                }).append(function () {
                    for (let i = 0; i < juegoEnCurso.cantidadSlots; i++) {
                        $("<div>", {
                            class: "tamanioMoneda rounded-circle monedaIntento",
                        }).appendTo($(this))
                    }
                })
            ), $("<div>", {
                class: "col-4 px-1"
            }).append(
                $("<div>", {
                    id: "comprobacion" + i, class: "d-flex justify-content-center align-items-center flex-column h-100"
                }).append(
                    $("<input>", {
                        type: "button", value: "Comprobar intento", class: "btn btn-success"
                    })
                )
            )
        ]).appendTo(DOM.intentos)
    }
}

const mostrarError = (contenedorPadre, mensajeError) => {
    $("<div>", {
        text: mensajeError,
        id: "mensajeError",
        class: "error"
    }).appendTo("#" + contenedorPadre)
    $("#mensajeError").delay(1000).fadeOut(500);
    setTimeout(() => $("#mensajeError").remove(), 1500);
}

const mostrarResultadoIntento = (filaIntento, cantidadAciertos, cantidadCoincidencias, cantidadFallos) => {
    $("#comprobacion" + filaIntento).empty();
    $("#comprobacion" + filaIntento).addClass('flex-row').removeClass('flex-column');
    generarMonedasPequenias(cantidadAciertos, "#0a0a0a", "#comprobacion" + filaIntento);
    generarMonedasPequenias(cantidadCoincidencias, "white", "#comprobacion" + filaIntento);
    generarMonedasPequenias(cantidadFallos, "gray", "#comprobacion" + filaIntento);
}

const generarMonedasPequenias = (numeroMonedas, color, idContenedorPadre) => {
    for (let i = 1; i <= numeroMonedas; i++) {
        $("<div>", {
            class: "monedaSolucion rounded-circle mx-1",
            style: "background-image: url(Assets/img/Coin.png);background-size: cover; background-color: " + color + ";"
        }).appendTo(idContenedorPadre)
    }
}

const mostrarPartidaGanada = () => {
    $("#intentos").children().each(function () { if ($(this).find("input")[0] != null) $(this).remove() });
    $("<div>", {
        class: "partidaGanda rounded-3 p-2 mt-3"
    }).append([
        $("<div>", {
            class: "row py-2"
        }).append(
            $("<div>", {
                class: "col"
            }).append(
                $("<h1>", {
                    class: "text-center",
                    text: "¡¡Has ganado la partida!!"
                })
            )
        ),
        $("<div>", {
            class: "row py-2"
        }).append(
            $("<div>", {
                class: "col"
            }).append(
                $("<div>", {
                    id: "slotsSolucion",
                    class: "d-flex justify-content-around w-100"
                }).append(function () {
                    for (let i = 0; i < juegoEnCurso.cantidadSlots; i++) {
                        $("<div>", {
                            class: "tamanioMoneda rounded-circle",
                            style: "background-image: url(Assets/img/CoinSolucion.png);background-size: cover; background-color: " + juegoEnCurso.combinacionCorrecta.colores[i] + ";"
                        }).appendTo($(this))
                    }
                })
            )
        ),
        $("<div>", {
            class: "row py-2"
        }).append([
            $("<div>", {
                class: "col d-flex align-items-center"
            }).append(
                $("<h4>", {
                }).append([
                    $("<span>", {
                        text: "Intentos restantes:",
                    }),
                    $("<span>", {
                        text: juegoEnCurso.intentosRestantes
                    })
                ])
            ),
            $("<div>", {
                class: "col text-end"
            }).append([
                $("<h4>", {
                    text: "¿Quieres volver a jugar?"
                }),
                $("<input>", {
                    type: "button",
                    value: "Nuevo juego",
                    class: "btn btn-success mt-2",
                    click: function () { iniciarJuego() }
                })
            ])
        ])
    ]).appendTo("#seccionResultado")
}


const mostrarPartidaPerdida = () => {
    $("#intentos").children().each(function () { if ($(this).find("input")[0] != null) $(this).remove() });
    $("<div>", {
        class: "partidaPerdida rounded-3 p-2 mt-3"
    }).append([
        $("<div>", {
            class: "row py-2"
        }).append(
            $("<div>", {
                class: "col"
            }).append(
                $("<h1>", {
                    class: "text-center",
                    text: "Has perdido la partida..."
                })
            )
        ),
        $("<div>", {
            class: "row py-2"
        }).append(
            $("<div>", {
                class: "col"
            }).append([
                $("<h4>", {
                    class: "mb-4",
                    text: "La combinacion correcta era:"
                }),
                $("<div>", {
                    id: "slotsSolucion",
                    class: "d-flex justify-content-around w-100"
                }).append(function () {
                    for (let i = 0; i < juegoEnCurso.cantidadSlots; i++) {
                        $("<div>", {
                            class: "tamanioMoneda rounded-circle",
                            style: "background-image: url(Assets/img/CoinSolucion.png);background-size: cover; background-color: " + juegoEnCurso.combinacionCorrecta.colores[i] + ";"
                        }).appendTo($(this))
                    }
                })
            ])
        ),
        $("<div>", {
            class: "row py-2"
        }).append([
            $("<div>", {
                class: "col d-flex align-items-center"
            }).append(
                $("<h4>", {
                    text: "Otra vez sera..."
                })
            ),
            $("<div>", {
                class: "col text-end"
            }).append([
                $("<h4>", {
                    text: "¿Quieres volver a intentarlo?"
                }),
                $("<input>", {
                    type: "button",
                    value: "Nuevo juego",
                    class: "btn btn-danger mt-2",
                    click: function () { iniciarJuego() }
                })
            ])
        ])
    ]).appendTo("#seccionResultado")
}