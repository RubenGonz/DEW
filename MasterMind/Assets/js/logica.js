const coloresDefecto = ["rgb(255, 0, 0)", "rgb(0, 128, 0)", "rgb(255, 255, 0)", "rgb(238, 130, 238)", "rgb(0, 0, 255)", "rgb(46, 64, 83)"];
let juegoEnCurso;

window.onload = () => {
    iniciarJuego(coloresDefecto, 10, 4, false);
}
const iniciarJuego = (coloresJuego = juegoEnCurso.coloresJuego, cantidadIntentos = juegoEnCurso.cantidadIntentos, cantidadSlots = juegoEnCurso.cantidadSlots, repeticion = juegoEnCurso.repeticion, combinacionCorrecta) => {
    juegoEnCurso = new juego(coloresJuego, cantidadIntentos, cantidadSlots, repeticion, combinacionCorrecta);
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
        colores.push(slot.children[0].style.backgroundColor);
    });
    return colores;
}

const generarNumeroAleatorio = (valorMin, valorMax) => {
    return Math.floor((Math.random() * (valorMax - valorMin)) + valorMin);
}

class juego {
    constructor(coloresJuego, cantidadIntentos, cantidadSlots, repeticion, combinacionCorrecta) {
        this.coloresJuego = coloresJuego;
        this.cantidadIntentos = cantidadIntentos;
        this.cantidadSlots = cantidadSlots;
        this.repeticion = repeticion;
        if (combinacionCorrecta == null) {
            this.combinacionCorrecta = this.generarCombinacionRandom(this.repeticion);
        } else {
            this.combinacionCorrecta = new combinacion(combinacionCorrecta);
        }
    }

    generarCombinacionRandom(repeticion) {
        let coloresRandom = [];
        do {
            let colorRandom = this.coloresJuego[generarNumeroAleatorio(0, this.coloresJuego.length)];
            if (repeticion) {
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
            this.cantidadIntentos = this.cantidadIntentos - 1;
            if (contadorAciertos == this.cantidadSlots) mostrarSolucion(true);
            else if (this.cantidadIntentos == 0) mostrarSolucion(false);
        } else {
            mostrarError(filaIntento);
        }
    }
}

class combinacion {
    constructor(colores) {
        this.colores = colores;
    }
}