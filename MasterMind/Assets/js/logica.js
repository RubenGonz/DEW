const coloresDefecto = ["#ff0000", "#008000", "#ffff00", "#ee82ee", "#0000ff", "#2e4053"];
let juegoEnCurso;

window.onload = () => {
    iniciarJuego(coloresDefecto, 10, 4, false);
}

const iniciarJuego = (coloresJuego = juegoEnCurso.coloresJuego, intentosIniciales = juegoEnCurso.intentosIniciales, cantidadSlots = juegoEnCurso.cantidadSlots, repeticiones = juegoEnCurso.repeticiones, combinacionCorrecta) => {
    juegoEnCurso = new juego(coloresJuego, intentosIniciales, cantidadSlots, repeticiones, combinacionCorrecta);
    generarConf();
    generarColores();
    DOM.seccionResultado.innerHTML = "";
    generarIntentos();
}

const comprobarSlots = (filaIntento) => {
    let slotsRellenos = true;
    Object.values(document.getElementById("slots" + filaIntento).children).forEach(slot => {
        if (slot.children[0] == undefined) slotsRellenos = false;
    });
    return slotsRellenos;
}

const obtenerColores = (filaIntento) => {
    let colores = [];
    Object.values(document.getElementById("slots" + filaIntento).children).forEach(slot => {
        if (slot.children[0] != undefined) {
            let color = convertirAHex(slot.children[0].style.backgroundColor);
            colores.push(color);
        } else colores.push(null);
    });
    return colores;
}

const generarNumeroAleatorio = (valorMin, valorMax) => {
    return Math.floor((Math.random() * (valorMax - valorMin)) + valorMin);
}

class juego {
    constructor(coloresJuego, intentosIniciales, cantidadSlots, repeticiones, combinacionCorrecta) {
        this.coloresJuego = coloresJuego;
        this.intentosIniciales = intentosIniciales;
        this.intentosRestantes = intentosIniciales;
        this.cantidadSlots = cantidadSlots;
        this.repeticiones = repeticiones;
        if (combinacionCorrecta == null) {
            this.combinacionCorrecta = this.generarCombinacionRandom(this.repeticiones);
        } else {
            this.combinacionCorrecta = new combinacion(combinacionCorrecta);
        }
    }

    generarCombinacionRandom(repeticiones) {
        let coloresRandom = [];
        do {
            let colorRandom = this.coloresJuego[generarNumeroAleatorio(0, this.coloresJuego.length)];
            if (repeticiones) {
                coloresRandom.push(colorRandom);
            } else if (!coloresRandom.includes(colorRandom)) {
                coloresRandom.push(colorRandom);
            }
        } while (coloresRandom.length != this.cantidadSlots);
        let combinacionRandom = new combinacion(coloresRandom);
        return combinacionRandom;
    }

    comprobarIntento(filaIntento) {
        if (comprobarSlots(filaIntento)) {
            let intento = new combinacion(obtenerColores(filaIntento));
            let contadorAciertos = 0;
            let contadorCoincidencias = 0;

            for (let i = 0; i < intento.colores.length; i++) {
                if (Object.values(this.combinacionCorrecta.colores)[i] == Object.values(intento.colores)[i]) contadorAciertos++;
                else if (Object.values(this.combinacionCorrecta.colores).includes(Object.values(intento.colores)[i])) contadorCoincidencias++;
            }

            let contadorFallos = this.cantidadSlots - contadorAciertos - contadorCoincidencias;
            mostrarResultado(filaIntento, contadorAciertos, contadorCoincidencias, contadorFallos);
            this.intentosRestantes = this.intentosRestantes - 1;
            if (contadorAciertos == this.cantidadSlots) mostrarSolucion(true);
            else if (this.intentosRestantes == 0) mostrarSolucion(false);
        } else {
            mostrarError("comprobacion" + filaIntento, "Rellena todos los slots");
        }
    }
}

class combinacion {
    constructor(colores) {
        this.colores = colores;
    }
}