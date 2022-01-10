/**
 * Clase juego que controla todos los parametros referentes al juego en curso
 */
class juego {
    /**
     * Constructor que genera un nuevo juego
     * @param {Array} coloresJuego codidos hexadecimales de los colores del juego
     * @param {Number} intentosIniciales numero de intentos totales del juego
     * @param {Number} cantidadSlots numero de slots totales de cada intento
     * @param {Boolean} repeticiones true si se permite repetir colores o false si no se permite
     * @param {Array} combinacionCorrecta codidos hexadecimales de la combinacion correcta del juego
     *      en el caso de ser nula se genera automaticamente
     */
    constructor(coloresJuego, intentosIniciales, cantidadSlots, repeticiones, combinacionCorrecta) {
        this.coloresJuego = coloresJuego;
        this.intentosIniciales = intentosIniciales;
        this.intentosRestantes = intentosIniciales;
        this.cantidadSlots = cantidadSlots;
        this.repeticiones = repeticiones;
        if (combinacionCorrecta == null) this.combinacionCorrecta = this.generarCombinacionRandom(this.repeticiones);
        else this.combinacionCorrecta = new combinacion(combinacionCorrecta);
    }

    /**
     * Funcion que genera una combinacion correcta de colores aleatorios
     * @param {Boolean} repeticiones true si se pueden repetir colores o false si no se puede
     * @returns objeto de clase combinacion con la combinacion creada
     */
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

    /**
     * Constante que comprueba si el usuario ha acertado la combinacion correcta
     * Devuelve un combinacion de aciertos, coincidencias y fallos al usuario 
     * de manera visual
     * Si acertaste la combinacion o te quedaste sin intentos te muestra una pantalla
     * de respuesta
     * @param {Number} filaIntento numero de la fila a tratar
     */
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

/**
 * Clase combinacion que almacena combinaciones de los intentos
 * y la combinacion correcta del juego
 */
class combinacion {
    /**
     * Constructor de la combinacion
     * @param {Array} colores codidos hexadecimales de los colores de la combinacion
     */
    constructor(colores) {
        this.colores = colores;
    }
}