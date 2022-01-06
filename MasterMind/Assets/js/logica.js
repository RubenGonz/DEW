const coloresDefecto = ["#ff0000", "#008000", "#ffff00", "#ee82ee", "#0000ff", "#2e4053"];
let juegoEnCurso;

window.onload = () => {
    iniciarJuego(coloresDefecto, 10, 4, false);
    $("#contenedorCombinacionCorrecta").hide();
    $("#configuracionPartida").hide();
}

const iniciarJuego = (coloresJuego = juegoEnCurso.coloresJuego, intentosIniciales = juegoEnCurso.intentosIniciales, cantidadSlots = juegoEnCurso.cantidadSlots, repeticiones = juegoEnCurso.repeticiones, combinacionCorrecta) => {
    juegoEnCurso = new juego(coloresJuego, intentosIniciales, cantidadSlots, repeticiones, combinacionCorrecta);
    generarConf();
    generarColores();
    generarSlotsCombinacion();
    generarIntentos();
    $('#seccionResultado').empty();
    $("botonCombinacionCorrecta").prop('disabled', false);
}

const comprobarSlots = (filaIntento) => {
    let slotsRellenos = true;
    $("#slots" + filaIntento).children().each(function () {
        if ($(this).children()[0] == undefined) slotsRellenos = false;
    });
    return slotsRellenos;
}

const obtenerColores = (filaIntento) => {
    let colores = [];
    $("#slots" + filaIntento).children().each(function () {
        if ($(this).children()[0] != undefined) {
            let color = convertirAHex($(this).children()[0].style.backgroundColor);
            colores.push(color);
        } else colores.push(null);
    });
    return colores;
}

class juego {
    constructor(coloresJuego, intentosIniciales, cantidadSlots, repeticiones, combinacionCorrecta) {
        this.coloresJuego = coloresJuego;
        this.intentosIniciales = intentosIniciales;
        this.intentosRestantes = intentosIniciales;
        this.cantidadSlots = cantidadSlots;
        this.repeticiones = repeticiones;
        if (combinacionCorrecta == null) this.combinacionCorrecta = this.generarCombinacionRandom(this.repeticiones);
        else this.combinacionCorrecta = new combinacion(combinacionCorrecta);
    }

    generarCombinacionRandom(repeticiones) {
        let coloresRandom = [];
        do {
            let colorRandom = this.coloresJuego[generarNumeroAleatorio(0, this.coloresJuego.length)];
            if (repeticiones) coloresRandom.push(colorRandom);
            else if (!coloresRandom.includes(colorRandom)) coloresRandom.push(colorRandom);
        } while (coloresRandom.length != this.cantidadSlots);
        let combinacionRandom = new combinacion(coloresRandom);
        return combinacionRandom;
    }

    comprobarIntento(filaIntento) {
        if (comprobarSlots(filaIntento)) {
            let intento = new combinacion(obtenerColores(filaIntento));
            let coloresSolucionSinRevisar = this.combinacionCorrecta.colores.slice();
            let coloresIntentoSinRevisar = obtenerColores(filaIntento);
            let contadorAciertos = 0;
            let contadorCoincidencias = 0;
            for (let i = 0; i < intento.colores.length; i++) {
                if (Object.values(this.combinacionCorrecta.colores)[i] == Object.values(intento.colores)[i]) {
                    contadorAciertos++;
                    coloresSolucionSinRevisar.splice(i, 1, null);
                    coloresIntentoSinRevisar.splice(i, 1, null);
                }
            }
            coloresSolucionSinRevisar = quitarNulos(coloresSolucionSinRevisar);
            coloresIntentoSinRevisar = quitarNulos(coloresIntentoSinRevisar);
            for (let i = 0; i < intento.colores.length; i++) {
                if (coloresSolucionSinRevisar.includes(coloresIntentoSinRevisar[i])) {
                    contadorCoincidencias++;
                    let indiceElemento = coloresSolucionSinRevisar.indexOf(coloresIntentoSinRevisar[i]);
                    coloresSolucionSinRevisar.splice(indiceElemento, 1, null);
                }
            }
            let contadorFallos = this.cantidadSlots - contadorAciertos - contadorCoincidencias;
            mostrarResultadoIntento(filaIntento, contadorAciertos, contadorCoincidencias, contadorFallos);
            this.intentosRestantes = this.intentosRestantes - 1;
            if (contadorAciertos == this.cantidadSlots) mostrarPartidaGanada();
            else if (this.intentosRestantes == 0) mostrarPartidaPerdida();
        } else mostrarError("comprobacion" + filaIntento, "Rellena todos los slots");
    }
}

class combinacion {
    constructor(colores) {
        this.colores = colores;
    }
}