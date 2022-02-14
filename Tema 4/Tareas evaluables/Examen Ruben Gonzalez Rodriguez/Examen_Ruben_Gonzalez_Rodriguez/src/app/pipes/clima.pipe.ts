import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clima'
})
export class ClimaPipe implements PipeTransform {

  transform(clima:string): string {
    let colorClima;
    return clima;
  }

}
