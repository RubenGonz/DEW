import { InterfazPelicula } from "src/app/interfaces/pelicula";

/**
 * Clase que permite construir una nueva 
 * pelicula usando la interfaz
 */
export class ClasePelicula implements InterfazPelicula {

    /**
     * Constructor de una pelicula
     * @param id de la pelicula
     * @param nombre de la pelicula
     * @param urlImagen de la portada de la pelicula
     * @param fechaSalida fecha escrita de la salida en cines de la pelicula
     * @param sinopsis descripcion de la pelicula
     * @param esMarvel true si es de marvel o false si no lo es
     */
    constructor(public id: number, public nombre: string, public urlImagen: string, public fechaSalida: string, public sinopsis: string, public esMarvel: boolean) {
        this.id = id;
        this.nombre = nombre;
        urlImagen == null ? this.urlImagen = "Sin información" : this.urlImagen = urlImagen;
        this.fechaSalida = this.transformarFecha(fechaSalida);
        sinopsis == null ? this.sinopsis = "Sin información." : this.sinopsis = sinopsis;
        this.esMarvel = esMarvel;
    }

    transformarFecha(fecha: string): string {
        if (fecha == null) fecha = "???"
        else {
            let partesFecha = fecha.split("-");
            fecha = partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0];
        }
        return fecha;
    }
}