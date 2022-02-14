import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rotacion'
})
export class RotacionPipe implements PipeTransform {

  transform(rotacion: number): string {
    let tierra = 24;
    if (rotacion >= tierra) {
      if (rotacion == tierra) return "(como en la tierra)";
      let restantes = rotacion - tierra;
      return "(" + restantes + " hora(s) mas que la tierra)";
    }
    else {
      let restantes = tierra - rotacion;
      return "(" + restantes + " hora(s) menos que la tierra)";
    }
  }

}
