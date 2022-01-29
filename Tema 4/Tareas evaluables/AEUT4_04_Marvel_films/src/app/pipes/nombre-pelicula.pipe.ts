import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nombrePelicula'
})
export class NombrePeliculaPipe implements PipeTransform {

    transform(nombrePelicula: string): any {
        if (nombrePelicula.includes(":")) {
            nombrePelicula = nombrePelicula.replace(": "," (");
            nombrePelicula+= ")";
        }
        return nombrePelicula;
    }

}
