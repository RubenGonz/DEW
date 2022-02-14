import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traslacion'
})
export class TraslacionPipe implements PipeTransform {

  transform(traslacion: number): string {
    let tierra = 365;
    if (traslacion >= tierra) {
      if (traslacion == tierra) return "(como en la tierra)";
      let restantes = traslacion - tierra;
      return "(" + restantes + " dias(s) mas que la tierra)";
    }
    else {
      let restantes = tierra - traslacion;
      return "(" + restantes + " dias(s) menos que la tierra)";
    }
  }

}
