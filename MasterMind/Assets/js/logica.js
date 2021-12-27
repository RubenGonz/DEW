const coloresDefecto = ["rgb(255, 0, 0)", "rgb(0, 128, 0)", "rgb(255, 255, 0)", "rgb(238, 130, 238)", "rgb(0, 0, 255)", "rgb(46, 64, 83)"];
const combinacionDefault = ['rgb(255, 0, 0)', 'rgb(0, 128, 0)', 'rgb(255, 255, 0)', 'rgb(238, 130, 238)'];

let juegoEnCurso;

window.onload = () => {
    iniciarJuego();
}

const iniciarJuego = (coloresJuego = coloresDefecto, cantidadIntentos = 10, cantidadSlots = 4, combinacionCorrecta = combinacionDefault) => {
    juegoEnCurso = new juego(coloresJuego, cantidadIntentos, cantidadSlots, combinacionCorrecta);
    generarColores();
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
    constructor(coloresJuego, cantidadIntentos, cantidadSlots, combinacionCorrecta) {
        this.coloresJuego = coloresJuego;
        this.cantidadIntentos = cantidadIntentos;
        this.cantidadSlots = cantidadSlots;
        if (combinacionCorrecta == combinacionDefault) {
            this.combinacionCorrecta = new combinacion(combinacionCorrecta);
        } else {
            this.combinacionCorrecta = this.generarCombinacionRandom();
        }
    }

    generarCombinacionRandom() {
        let coloresRandom = [];
        for (let i = 0; i < this.cantidadSlots; i++) {
            let colorRandom = this.coloresJuego[generarNumeroAleatorio(0, this.coloresJuego.length)];
            coloresRandom.push(colorRandom);
        }
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

            let contadorFallos = intento.colores.length - contadorAciertos - contadorCoincidencias;
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