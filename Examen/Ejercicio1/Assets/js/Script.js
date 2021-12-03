/**
 * Constante que guarda algunos valores del documento html
 */
const DOM = {
    parametro1: document.getElementById("parametro1"),
    parametro2: document.getElementById("parametro2"),
    parametro3: document.getElementById("parametro3"),
    parametro4: document.getElementById("parametro4"),
    intento: document.getElementById("intento"),
    enviarIntento: document.getElementById("enviarIntento"),
    error: document.getElementsByClassName("error"),
    resultado: document.getElementById("resultado")
}

/**
 * Clase combinación que recoje los parametros de un intento
 */
class combinacion {
    constructor(opcion1, opcion2, opcion3, opcion4) {
        this.opcion1 = opcion1;
        this.opcion2 = opcion2;
        this.opcion3 = opcion3;
        this.opcion4 = opcion4;
    }
}

/**
 * Combinación correcta
 */
const combinacionCorrecta = new combinacion("A", "B", "C", "D");

/**
 * Constante que guarda las posibles letras y el valor de su clase
 */
const letras = {
    "A": "color-A",
    "B": "color-B",
    "C": "color-C",
    "D": "color-D",
    "E": "color-E",
    "F": "color-F"
};

/**
 * Constante que cmprueba la cantidad de aciertos y coincidencias
 * tuvo un intento
 * @param {Class} intento intento a comprobar
 */
const comprobarCombinacion = (intento) => {
    if (DOM.error.length == 0) {
        let resultado = "Hola";
        let contadorAciertos = 0;
        let contadorCoincidencias = 0;
        for (let i = 0; i < Object.values(combinacionCorrecta).length; i++) {
            if (Object.values(combinacionCorrecta)[i] == Object.values(intento)[i]) contadorAciertos++;
            if (Object.values(combinacionCorrecta).includes(Object.values(intento)[i])) contadorCoincidencias++;
        }
        resultado = "Tienes " + contadorAciertos + " aciertos y " + (contadorCoincidencias - contadorAciertos) + " coincidencias";
        mostrarResultado(intento, resultado);
    }
}

/**
 * Constante que añade a la tabla la información del intento
 * @param {clase} intento intento a mostrar
 * @param {String} resultado resultado del intento
 */
const mostrarResultado = (intento, resultado) => {
    let tr = document.createElement("tr");
    tr.appendChild(crearElemento("td", intento.opcion1, "color-" + intento.opcion1));
    tr.appendChild(crearElemento("td", intento.opcion2, "color-" + intento.opcion2));
    tr.appendChild(crearElemento("td", intento.opcion3, "color-" + intento.opcion3));
    tr.appendChild(crearElemento("td", intento.opcion4, "color-" + intento.opcion4));
    tr.appendChild(crearElemento("td", resultado));
    DOM.resultado.appendChild(tr);
}

/**
 * Constante que crea una etiqueta html con un contenido y una clase
 * @param {String} etiqueta nombre de la etiqueta a crear
 * @param {String} contenido contenido que se englobará en la etiqueta
 * @param {String} clase clase insertda en la etiqueta
 * @returns elemento final creado
 */
const crearElemento = (etiqueta, contenido, clase) => {
    let elemento = document.createElement(etiqueta);
    elemento.innerHTML = contenido;
    elemento.classList = clase;
    return elemento;
}

/**
 * Constante que valida que la letra introducida sea apta
 * @param {String} letraIntroducida letra a validar
 * @returns true si es válida o false si no lo es
 */
const validarLetra = (letraIntroducida) => {
    let encontrada = false;
    Object.keys(letras).forEach(letra => {
        if (letraIntroducida.toUpperCase() == letra) encontrada = true;
    })
    return encontrada;
}

/**
 * Evento que pinta la letra de los input o le coloca una clase
 * de error 
 */
DOM.intento.addEventListener("change", (e) => {
    e.target.classList = "error";
    if (validarLetra(e.target.value)) {
        e.target.classList = "color-" + e.target.value.toUpperCase();
    };
});

/**
 * Evento de mandar el formulario
 */
DOM.enviarIntento.addEventListener("click", () => {
    let intento = new combinacion(DOM.parametro1.value.toUpperCase(), DOM.parametro2.value.toUpperCase(), DOM.parametro3.value.toUpperCase(), DOM.parametro4.value.toUpperCase());
    comprobarCombinacion(intento);
});
