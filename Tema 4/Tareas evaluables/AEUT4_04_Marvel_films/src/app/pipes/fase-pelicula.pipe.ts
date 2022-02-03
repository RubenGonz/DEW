import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fasePelicula'
})

/**
 * Pipe que transforma una fecha a una fase de marvel
 */
export class FasePeliculaPipe implements PipeTransform {

    transform(fecha: string): string {
        let anio = parseInt(fecha.substring(fecha.length -4));
        if (anio >= 2008 && anio <= 2012) return "Fase 1";
        if (anio >= 2013 && anio <= 2015) return "Fase 2";
        if (anio >= 2016 && anio <= 2019) return "Fase 3";
        if (anio >= 2020 && anio <= 2023) return "Fase 4";
        return "Fase inexistente";
    }

}
