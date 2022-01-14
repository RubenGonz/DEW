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

const habitaciones = [
    new habitacion("Salon",["xiasoj","gyuguy"]),
    new habitacion("Cocina",["xiasoj","gyuguy"]),
    new habitacion("Banio",["xiasoj","gyuguy"]),
    new habitacion("Dormitorio",["xiasoj","gyuguy"])
]

function mostrarNombres(): void {
    //chechbox
}

function mostrarHabitaciones(): void {
    //chechbox
}

function crearOracion(nombrePersona: string, nombreHabitacion: string): string {
    let oracionCreada: string;

    return oracionCreada;
}