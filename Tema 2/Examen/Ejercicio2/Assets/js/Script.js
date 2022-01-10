/**
 * Constante que guarda valores del html
 */
const DOM = {
    nombre: document.getElementById("nombre"),
    tipo: document.getElementById("tipo"),
    numOpciones: document.getElementById("numOpciones"),
    opciones: document.getElementById("opciones"),
    inputsOpciones: document.getElementById("opciones").getElementsByTagName("input"),
    enviarDatos: document.getElementById("enviarDatos"),
    error: document.getElementsByName("error")
}

/**
 * Constante que guarda las expresiones regulares
 */
const expRegulares = {
    nombre: "^([A-ZÁÉÍÓÚÑ]{1}[a-záéíóúüñ]+[ ]?){1,2}$",
    numOpciones: "^[0123456789]$"
}

/**
 * Clase que guarda los parametros de la partida
 */
class partida {
    constructor(nombre, tipo, numOpciones, opciones) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.numOpciones = numOpciones;
        this.opciones = opciones;
    }
}

/**
 * Constante que valida si un texto cumple una 
 * expresion regular
 * 
 * @param expresion expresion regular que debe cumplir el texto
 * @param texto texto a validar
 * @returns true si es valido o false si no lo es
 */
const validarTexto = (expresion, texto) => {
    let patron = new RegExp(expresion);
    return patron.test(texto);
}

/**
 * Constante que valida todo el formulario
 */
const validarDatos = () => {
    if (!validarTexto(DOM.nombre.value, expRegulares.nombre)) DOM.nombre.setAttribute("name", "hola");
    if (!validarTexto(DOM.numOpciones.value, expRegulares.numOpciones)) DOM.numOpciones.setAttribute("name", "hola");
}

/**
 * Constante que crea tantos inputs como queramos
 * @param {Number} numOpciones numero de inputs a crear
 */
const crearOpciones = (numOpciones) => {
    for (let i = 0; i < numOpciones; i++) {
        let opcion = document.createElement("div");
        opcion.appendChild(crearElemento("label", "Opción " + (i + 1)));
        opcion.appendChild(crearElemento("input", "", "m-2"))
        DOM.opciones.appendChild(opcion);
    }
}

/**
 * Constante que crea una etiqueta html con un contenido y una clase
 * @param {String} etiqueta nombre de la etiqueta a crear
 * @param {String} contenido contenido que se englobará en la etiqueta
 * @returns elemento final creado
 */
const crearElemento = (etiqueta, contenido, clase = "") => {
    let elemento = document.createElement(etiqueta);
    elemento.innerHTML = contenido;
    elemento.classList = clase;
    return elemento;
}

/**
 * Evento de mandar el formulario
 */
DOM.enviarDatos.addEventListener("click", () => {
    validarDatos();
});

/**
 * Evento que añade opciones
 */
DOM.numOpciones.addEventListener("change", () => {
    if (validarTexto(DOM.numOpciones.value, expRegulares.numOpciones)) {
        if (DOM.opciones.innerHTML != "") DOM.opciones.innerHTML = "";
        crearOpciones(DOM.numOpciones.value);
    }
});