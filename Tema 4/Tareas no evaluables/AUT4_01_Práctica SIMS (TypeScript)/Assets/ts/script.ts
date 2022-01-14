interface interfazHabitacion {
    nombre: string;
    posiblesFrases: string[];
    escogerFrase(): string;
}

class habitacion implements interfazHabitacion {
    nombre: string;
    posiblesFrases: string[];

    constructor(nombre: string, posiblesFrases: string[]) {
        this.nombre = nombre;
        this.posiblesFrases = posiblesFrases;
    }

    escogerFrase(): string {
        let indiceRandom = Math.floor(Math.random() * this.posiblesFrases.length)
        return this.posiblesFrases[indiceRandom];
    }
}

const nombres = ["Carlos", "Gonzalo", "Luisa", "Fernando", "Arnaldo", "Carolina"];

const habitaciones = {
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
}

const DOM = {
    contenedorOpciones: document.getElementById("contenedorOpciones"),
    nombres: document.getElementById("nombres"),
    habitaciones: document.getElementById("habitaciones"),
    oraciones: document.getElementById("oraciones"),
    limpiar: document.getElementById("limpiar")
}

function eliminarContenido(id: string): void {
    document.getElementById(id).innerHTML = "";
}

function agregarOpcion(idPadre: string, contenido: string): void {
    let contenedorPadre = document.getElementById(idPadre);

    let input = document.createElement("input");
    input.type = "radio";
    input.classList.add("btn-check");
    input.name = idPadre;
    input.id = contenido;
    contenedorPadre.appendChild(input);

    let label = document.createElement("label");
    if (idPadre == "nombres") label.classList.add("btn", "btn-outline-primary", "p-1");
    else label.classList.add("btn", "btn-outline-success", "p-0");
    label.htmlFor = contenido;
    label.innerHTML = contenido;
    contenedorPadre.appendChild(label);
}

function mostrarNombres(): void {
    eliminarContenido("nombres");
    nombres.forEach(nombre => {
        agregarOpcion("nombres", nombre)
    })
}

function mostrarHabitaciones(): void {
    eliminarContenido("habitaciones");
    Object.keys(habitaciones).map(habitacion => {
        agregarOpcion("habitaciones", habitaciones[habitacion].nombre);
    })
}

function mostrarNuevaOracion(nombrePersona: string, nombreHabitacion: string): void {
    let oracionCreada: string;
    oracionCreada = nombrePersona + " " + habitaciones[nombreHabitacion].escogerFrase();
    let contenedor = document.createElement("div");
    contenedor.innerHTML = oracionCreada;
    if (DOM.oraciones.querySelector("#oracionPredeterminada") != undefined) eliminarContenido("oraciones")
    DOM.oraciones.appendChild(contenedor);
}

DOM.contenedorOpciones.addEventListener("click", (e: MouseEvent): void => {
    let target = e.target as Element;
    if (target.nodeName == "INPUT") {
        let nombre = document.querySelectorAll('#nombres input[type="radio"]:checked')[0];
        let habitacion = document.querySelectorAll('#habitaciones input[type="radio"]:checked')[0]
        if (nombre != undefined && habitacion != undefined) {
            mostrarNuevaOracion(nombre.id, habitacion.id);
        }
    }
})

DOM.limpiar.addEventListener("click", (): void => {
    eliminarContenido("oraciones");
    let contenedorPredeterminado = document.createElement("div");
    contenedorPredeterminado.id = "oracionPredeterminada";
    contenedorPredeterminado.classList.add("text-center");
    contenedorPredeterminado.innerHTML = "Aquí se mostraran las oraciones";
    DOM.oraciones.appendChild(contenedorPredeterminado);
})

window.onload = () => {
    mostrarNombres();
    mostrarHabitaciones();
}