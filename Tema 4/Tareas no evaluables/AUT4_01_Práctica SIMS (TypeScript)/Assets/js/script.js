/**
 * Clase habitacion que contiene el nombre de
 * una habitacion y sus posibles frases
 */
var habitacion = /** @class */ (function () {
    /**
     * Constructor de una habitacion
     * @param nombre nombre de la habitacion
     * @param posiblesFrases array de posibles frases relacionadas
     */
    function habitacion(nombre, posiblesFrases) {
        this.nombre = nombre;
        this.posiblesFrases = posiblesFrases;
    }
    /**
     * Funcion que escoge aleatoriamente una de las posibles frases
     * @returns
     */
    habitacion.prototype.escogerFrase = function () {
        var indiceRandom = Math.floor(Math.random() * this.posiblesFrases.length);
        return this.posiblesFrases[indiceRandom];
    };
    return habitacion;
}());
/**
 * Constante que recoge todos los nombres del programa
 */
var nombres = ["Carlos", "Gonzalo", "Luisa", "Fernando", "Arnaldo", "Carolina"];
/**
 * Constante que recoge todas las habitaciones del programa
 */
var habitaciones = {
    "Salon": new habitacion("Salon", [
        "está viendo la tele en el salón",
        "está leyendo en el salón",
        "está con su hermana en el salón",
        "está descansando en el salón"
    ]),
    "Cocina": new habitacion("Cocina", [
        "está cocinando en la cocina",
        "está comiendo en la cocina",
        "está haciendo un bizcocho en la cocina",
        "está fregando en la cocina"
    ]),
    "Baño": new habitacion("Baño", [
        "se está lavando los dientes en el baño",
        "se encuentra en la ducha del baño",
        "está haciendo sus necesidades en el baño",
        "está limpiando el baño"
    ]),
    "Dormitorio": new habitacion("Dormitorio", [
        "está durmiendo en el dormitorio",
        "está haciendo tarea en el dormitorio",
        "está vistiendose en el dormitorio",
        "está escuchando musica en el dormitorio"
    ])
};
/**
 * Constante DOM que recoge algunos elementos del html
 */
var DOM = {
    contenedorOpciones: document.getElementById("contenedorOpciones"),
    nombres: document.getElementById("nombres"),
    habitaciones: document.getElementById("habitaciones"),
    oraciones: document.getElementById("oraciones"),
    limpiar: document.getElementById("limpiar")
};
/**
 * Funcion que elimina el contenido de un contenedor
 * @param id id del contenedor
 */
function eliminarContenido(id) {
    document.getElementById(id).innerHTML = "";
}
/**
 * Funcion que agrega una nueva opcion al contenedor de los
 * nombres o de las habitaciones
 * @param idPadre id del contenedor padre
 * @param contenido texto del contenedor
 */
function agregarOpcion(idPadre, contenido) {
    var contenedorPadre = document.getElementById(idPadre);
    var input = document.createElement("input");
    input.type = "radio";
    input.classList.add("btn-check");
    input.name = idPadre;
    input.id = contenido;
    contenedorPadre.appendChild(input);
    var label = document.createElement("label");
    if (idPadre == "nombres")
        label.classList.add("btn", "btn-outline-primary", "p-1");
    else if (idPadre == "habitaciones")
        label.classList.add("btn", "btn-outline-success", "p-0");
    label.htmlFor = contenido;
    label.innerHTML = contenido;
    contenedorPadre.appendChild(label);
}
/**
 * Funcion que muestra las opciones
 * de los nombres
 */
function mostrarNombres() {
    eliminarContenido("nombres");
    nombres.forEach(function (nombre) {
        agregarOpcion("nombres", nombre);
    });
}
/**
 * Funcion que muestra las opciones
 * de las habitaciones
 */
function mostrarHabitaciones() {
    eliminarContenido("habitaciones");
    Object.keys(habitaciones).map(function (habitacion) {
        agregarOpcion("habitaciones", habitaciones[habitacion].nombre);
    });
}
/**
 * Funcion que recoge la hora y los minutos actuales
 * @returns hora en formato hora:minutos
 */
function horaActual() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    if (hora < 10)
        hora = 0 + hora;
    if (minutos < 10)
        minutos = 0 + minutos;
    return hora + ":" + minutos;
}
/**
 * Funcion que crea y muestra una oracion nueva
 * @param nombrePersona nombre de la persona de la nueva oracion
 * @param nombreHabitacion nombre de la habitacion de la nueva oracion
 */
function mostrarNuevaOracion(nombrePersona, nombreHabitacion) {
    var oracionCreada;
    oracionCreada = nombrePersona + " " + habitaciones[nombreHabitacion].escogerFrase() + " desde las " + horaActual() + ".";
    var contenedor = document.createElement("div");
    contenedor.innerHTML = oracionCreada;
    if (DOM.oraciones.querySelector("#oracionPredeterminada") != undefined)
        eliminarContenido("oraciones");
    DOM.oraciones.appendChild(contenedor);
}
/**
 * Evento que intenta crear una
 * nueva oracion si ambas opciones
 * estan marcadas
 */
DOM.contenedorOpciones.addEventListener("click", function (e) {
    var target = e.target;
    if (target.nodeName == "INPUT") {
        var nombre = document.querySelectorAll('#nombres input[type="radio"]:checked')[0];
        var habitacion_1 = document.querySelectorAll('#habitaciones input[type="radio"]:checked')[0];
        if (nombre != undefined && habitacion_1 != undefined) {
            mostrarNuevaOracion(nombre.id, habitacion_1.id);
        }
    }
});
/**
 * Evento que elimina las oraciones y muestra un mensaje
 */
DOM.limpiar.addEventListener("click", function () {
    eliminarContenido("oraciones");
    var contenedorPredeterminado = document.createElement("div");
    contenedorPredeterminado.id = "oracionPredeterminada";
    contenedorPredeterminado.classList.add("text-center");
    contenedorPredeterminado.innerHTML = "Aquí se mostraran las oraciones";
    DOM.oraciones.appendChild(contenedorPredeterminado);
});
/**
 * Acciones a ejecutar cuando cargue la pagina
 */
window.onload = function () {
    mostrarNombres();
    mostrarHabitaciones();
};
