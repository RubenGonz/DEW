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
var habitaciones = [
    new habitacion("Salon", ["xiasoj", "gyuguy"]),
    new habitacion("Cocina", ["xiasoj", "gyuguy"]),
    new habitacion("Banio", ["xiasoj", "gyuguy"]),
    new habitacion("Dormitorio", ["xiasoj", "gyuguy"])
];
function mostrarNombres() {
    //chechbox
}
function mostrarHabitaciones() {
    //chechbox
}
function crearOracion(nombrePersona, nombreHabitacion) {
    var oracionCreada;
    return oracionCreada;
}
