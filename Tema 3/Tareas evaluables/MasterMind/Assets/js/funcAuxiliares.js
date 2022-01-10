/**
 * Constante que convierte un color en codigo rgb a hexadecimal
 * @param {String} colorRgb codigo rgb del color
 * @returns codigo hexadecimal del color
 */
const convertirAHex = (colorRgb) => {
    let secciones = colorRgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    secciones.shift();
    for (let i = 0; i < 3; i++) {
        secciones[i] = parseInt(secciones[i]).toString(16);
        if (secciones[i].length == 1) secciones[i] = '0' + secciones[i];
    }
    return '#' + secciones.join('');
}

/**
 * Constante que genera un numero random entre dos valores
 * @param {Number} valorMin valor minimo
 * @param {Number} valorMax valor maximo
 * @returns numero aleatorio
 */
const generarNumeroAleatorio = (valorMin, valorMax) => {
    return Math.floor((Math.random() * (valorMax - valorMin)) + valorMin);
}

/**
 * Constante que quita los valores nulos de un array
 * @param {Array} array array a tratar
 * @returns array sin valores nulos
 */
const quitarNulos = (array) => {
    return array.filter(function (elemento) {
        return elemento != null;
    });
}