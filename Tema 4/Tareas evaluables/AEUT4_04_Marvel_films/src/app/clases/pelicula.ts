import { InterfazPelicula } from "src/app/interfaces/pelicula"; 

export class ClasePelicula implements InterfazPelicula {
    constructor(public id: number, public nombre: string, public urlImagen: string, public fechaSalida: string, public sinopsis: string, public esMarvel: boolean) { 
        this.id = id;
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.fechaSalida = fechaSalida;
        this.sinopsis = sinopsis;
        this.esMarvel = esMarvel;
    }
}