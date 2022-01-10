/**
 * Constante que genera los valores de la 
 * configuracion para el usuario
 */
const generarConf = () => {
    DOM.coloresConf.empty();
    juegoEnCurso.coloresJuego.forEach(color => {
        $("<input>", {
            type: "color", value: color
        }).appendTo(DOM.coloresConf)
    })
    DOM.inputIntentos.val(juegoEnCurso.intentosIniciales);
    DOM.inputSlots.val(juegoEnCurso.cantidadSlots);
    if (juegoEnCurso.repeticiones) {
        DOM.checkboxRepeticiones.prop("checked", true);
        DOM.checkboxRepeticiones.next().text("Repeticiones activadas");
    } else {
        DOM.checkboxRepeticiones.prop("checked", false);
        DOM.checkboxRepeticiones.next().text("Repeticiones desactivadas");
    }
}

/**
 * Constante que genera un nuevo input de 
 * tipo color en la configuracion y si no 
 * puede muestra un error
 */
const aniadirColor = () => {
    let coloresMaximos = 10;
    if (DOM.coloresConf.children().length < coloresMaximos) {
        let nuevoColor;
        let colores = [];
        DOM.coloresConf.children().each(function () { colores.push($(this).val()) });
        do {
            let colorRandom = "rgb(" + generarNumeroAleatorio(0, 255) + "," + generarNumeroAleatorio(0, 255) + "," + generarNumeroAleatorio(0, 255) + ")";
            nuevoColor = convertirAHex(colorRandom);
        } while (colores.includes(nuevoColor));
        $("<input>", {
            type: "color", value: nuevoColor
        }).appendTo(DOM.coloresConf)
    } else mostrarError("errorColores", "No puede haber mas de " + coloresMaximos + " colores");
}

/**
 * Constante que elimina un input de 
 * tipo color en la configuracion y si no 
 * puede muestra un error
 */
const quitarColor = () => {
    if (DOM.coloresConf.children().length > 1) DOM.coloresConf.children().last().remove();
    else mostrarError("errorColores", "Tiene que haber como minimo un color");
}

/**
 * Constante que genera los colores de la leyenda
 */
const generarColores = () => {
    if (!DOM.opciones.is(":empty")) DOM.opciones.empty();
    juegoEnCurso.coloresJuego.forEach(color => {
        $("<div>", {
            id: color,
            draggable: "true",
            class: "tamanioMoneda rounded-circle",
            style: "background-image: url('Assets/img/Coin.png'); background-size: cover; background-color:" + color + ";"
        }).appendTo(DOM.opciones)
    })
}

/**
 * Constante que genera los slots de la seccion 
 * de la combinacion correcta
 */
const generarSlotsCombinacion = () => {
    if (!DOM.slotsCombCorrecta.is(":empty")) DOM.slotsCombCorrecta.empty();
    for (let i = 0; i < juegoEnCurso.cantidadSlots; i++) {
        $("<div>", {
            class: "tamanioMoneda rounded-circle monedaIntento",
        }).appendTo(DOM.slotsCombCorrecta)
    }
}

/**
 * Constante que genera los intentos 
 * en la seccion de intentos
 */
const generarIntentos = () => {
    if (!DOM.intentos.is(":empty")) DOM.intentos.empty();
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

/**
 * Constante que genera un mensaje de error bajo un contenedor
 * @param {String} idContenedorPadre id del contenedor padre
 * @param {String} mensajeError mensaje a mostrar
 */
const mostrarError = (idContenedorPadre, mensajeError) => {
    $("<div>", {
        text: mensajeError,
        id: "mensajeError",
        class: "error"
    }).appendTo("#" + idContenedorPadre)
    $("#mensajeError").delay(1000).fadeOut(500);
    setTimeout(() => $("#mensajeError").remove(), 1500);
}

/**
 * Constante que genera el resultado del intento hecho
 * @param {Number} filaIntento numero de la fila donde se hizo el intento
 * @param {Number} cantidadAciertos numero de slots acertados
 * @param {Number} cantidadCoincidencias numero de slots coincididos
 * @param {Number} cantidadFallos numero de slots fallados
 */
const mostrarResultadoIntento = (filaIntento, cantidadAciertos, cantidadCoincidencias, cantidadFallos) => {
    $("#comprobacion" + filaIntento).empty();
    $("#comprobacion" + filaIntento).addClass("flex-row").removeClass("flex-column");
    generarMonedasPequenias(cantidadAciertos, "#0a0a0a", "comprobacion" + filaIntento);
    generarMonedasPequenias(cantidadCoincidencias, "white", "comprobacion" + filaIntento);
    generarMonedasPequenias(cantidadFallos, "gray", "comprobacion" + filaIntento);
}

/**
 * Constante que genera monedas pequenias de un color 
 * @param {Number} numeroMonedas numero de monedas a generar
 * @param {String} color color en hexadecimal de la moneda
 * @param {String} idContenedorPadre id del contenedorpadre
 */
const generarMonedasPequenias = (numeroMonedas, color, idContenedorPadre) => {
    for (let i = 1; i <= numeroMonedas; i++) {
        $("<div>", {
            class: "monedaSolucion rounded-circle mx-1",
            style: "background-image: url(Assets/img/Coin.png);background-size: cover; background-color: " + color + ";"
        }).appendTo("#" + idContenedorPadre)
    }
}

/**
 * Constante que genera la pantalla de 
 * ganador al acabar la partida
 */
const mostrarPartidaGanada = () => {
    DOM.intentos.children().each(function () { if ($(this).find("input")[0] != null) $(this).remove() });
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
    ]).appendTo(DOM.seccionResultado)
}

/**
 * Constante que genera la pantalla de 
 * perdedor al acabar la partida
 */
const mostrarPartidaPerdida = () => {
    DOM.intentos.children().each(function () { if ($(this).find("input")[0] != null) $(this).remove() });
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
    ]).appendTo(DOM.seccionResultado)
}