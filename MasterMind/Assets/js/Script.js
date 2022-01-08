/**
 * Variables globales
 */
const coloresDefecto = ["#ff0000", "#008000", "#ffff00", "#ee82ee", "#0000ff", "#2e4053"];
let juegoEnCurso;

/**
 * Funciones cuando carga la pagina
 */
$(document).ready(function () { iniciarJuego(coloresDefecto, 10, 4, false); });

/**
 * Constante que inicia o reinicia una partida
 * @param {Array} coloresJuego codidos hexadecimales de los colores del juego
 * @param {Number} intentosIniciales numero de intentos totales del juego
 * @param {Number} cantidadSlots numero de slots totales de cada intento
 * @param {Boolean} repeticiones true si se permite repetir colores o false si no se permite
 * @param {Array} combinacionCorrecta codidos hexadecimales de la combinacion correcta del juego
 */
const iniciarJuego = (coloresJuego = juegoEnCurso.coloresJuego, intentosIniciales = juegoEnCurso.intentosIniciales, cantidadSlots = juegoEnCurso.cantidadSlots, repeticiones = juegoEnCurso.repeticiones, combinacionCorrecta) => {
    juegoEnCurso = new juego(coloresJuego, intentosIniciales, cantidadSlots, repeticiones, combinacionCorrecta);
    generarConf();
    generarColores();
    generarSlotsCombinacion();
    generarIntentos();
    DOM.seccionResultado.empty();
    DOM.botonCombinacionCorrecta.prop('disabled', false);
    DOM.contenedorCombinacionCorrecta.hide();
    DOM.configuracionPartida.hide();
}

/**
 * Constante que comprueba que todos los slots de un 
 * intento estan rellenos
 * @param {Number} filaIntento numero de la fila a comprobar
 * @returns true si estan rellenos o false si alguno no lo esta
 */
const comprobarSlots = (filaIntento) => {
    let slotsRellenos = true;
    $("#slots" + filaIntento).children().each(function () {
        if ($(this).children()[0] == undefined) slotsRellenos = false;
    });
    return slotsRellenos;
}

/**
 * Constante que obtiene los colores de una fila
 * @param {Number} filaIntento numero de la fila a tratar
 * @returns Array con los colores en hexadecimal
 */
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

/**
 * Constante que comprueba que los valores 
 * introducidos en la configuracion son validos
 * Si son validos inicia un nuevo juego con esta configuracion 
 * Si no son validos muestra mensajes de error donde corresponda
 */
const establecerNuevaConf = () => {
    let configuracionValida = true;
    let colores = [];
    DOM.coloresConf.children().each(function () { colores.push($(this).val()) });
    let numIntentos = parseInt(DOM.inputIntentos.val());
    let numSlots = parseInt(DOM.inputSlots.val());
    let repeticiones = DOM.checkboxRepeticiones.prop("checked");;
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