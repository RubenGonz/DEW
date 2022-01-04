function convertirAHex(colorRgb) {
    let secciones = colorRgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    secciones.shift();
    for (let i = 0; i < 3; i++) {
        secciones[i] = parseInt(secciones[i]).toString(16);
        if (secciones[i].length == 1) secciones[i] = '0' + secciones[i];
    }
    return '#' + secciones.join('');
}

const generarNumeroAleatorio = (valorMin, valorMax) => {
    return Math.floor((Math.random() * (valorMax - valorMin)) + valorMin);
}