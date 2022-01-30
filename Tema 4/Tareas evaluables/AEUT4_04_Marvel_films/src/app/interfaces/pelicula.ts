/**
 * Interfaz de las peliculas
 */
export interface InterfazPelicula {
    id: number;
    nombre: string;
    urlImagen: string;
    fechaSalida: string;
    sinopsis: string;
    esMarvel: boolean;
}