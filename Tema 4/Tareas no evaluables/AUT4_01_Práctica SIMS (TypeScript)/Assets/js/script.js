var habitacion = /** @class */ (function () {
    function habitacion(nombre, posiblesFrases) {
        this.nombre = nombre;
        this.posiblesFrases = posiblesFrases;
    }
    habitacion.prototype.escogerFrase = function () {
        var indiceRandom = Math.floor(Math.random() * this.posiblesFrases.length);
        return this.posiblesFrases[indiceRandom];
    };
    return habitacion;
}());
var nombres = ["Carlos", "Gonzalo", "Luisa", "Fernando", "Arnaldo", "Carolina"];
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
var DOM = {
    contenedorOpciones: document.getElementById("contenedorOpciones"),
    nombres: document.getElementById("nombres"),
    habitaciones: document.getElementById("habitaciones"),
    oraciones: document.getElementById("oraciones"),
    limpiar: document.getElementById("limpiar")
};
function eliminarContenido(id) {
    document.getElementById(id).innerHTML = "";
}
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
    else
        label.classList.add("btn", "btn-outline-success", "p-0");
    label.htmlFor = contenido;
    label.innerHTML = contenido;
    contenedorPadre.appendChild(label);
}
function mostrarNombres() {
    eliminarContenido("nombres");
    nombres.forEach(function (nombre) {
        agregarOpcion("nombres", nombre);
    });
}
function mostrarHabitaciones() {
    eliminarContenido("habitaciones");
    Object.keys(habitaciones).map(function (habitacion) {
        agregarOpcion("habitaciones", habitaciones[habitacion].nombre);
    });
}
function mostrarNuevaOracion(nombrePersona, nombreHabitacion) {
    var oracionCreada;
    oracionCreada = nombrePersona + " " + habitaciones[nombreHabitacion].escogerFrase();
    var contenedor = document.createElement("div");
    contenedor.innerHTML = oracionCreada;
    if (DOM.oraciones.querySelector("#oracionPredeterminada") != undefined)
        eliminarContenido("oraciones");
    DOM.oraciones.appendChild(contenedor);
}
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
DOM.limpiar.addEventListener("click", function () {
    eliminarContenido("oraciones");
    var contenedorPredeterminado = document.createElement("div");
    contenedorPredeterminado.id = "oracionPredeterminada";
    contenedorPredeterminado.classList.add("text-center");
    contenedorPredeterminado.innerHTML = "Aquí se mostraran las oraciones";
    DOM.oraciones.appendChild(contenedorPredeterminado);
});
window.onload = function () {
    mostrarNombres();
    mostrarHabitaciones();
};
