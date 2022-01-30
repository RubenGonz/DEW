import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nombrePelicula'
})

/**
 * Pipe que transforma un nombre de pelicula 
 * a otro mas sencillo 
 */
export class NombrePeliculaPipe implements PipeTransform {

    transform(nombrePelicula: string): any {
        if (nombrePelicula.includes(":")) {
            nombrePelicula = nombrePelicula.replace(": "," (");
            nombrePelicula+= ")";
        }
        return nombrePelicula;
    }

}
