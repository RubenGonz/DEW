import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { InterfazPlaneta } from '../interfaces/planeta';
import { ClasePlaneta } from '../classes/planeta';

@Injectable({
  providedIn: 'root'
})
export class PlanetasService {

  planetasApi: InterfazPlaneta[] = [];
  planetasObtenidos: boolean = false;
  ultimoId: number = 0;
  url: string = "https://swapi.dev/api/planets";

  constructor(private http: HttpClient) { }

  /**
   * Funcion que retorna un observable con los planetas de la 
   * api en el caso de que no se hayan obtenido nunca o retorna 
   * los planetas actuales del servicio en caso contrario
   * @returns Observable con los planetas en un array
   */
  getPlanetas(): Observable<InterfazPlaneta[]> {
    if (this.planetasObtenidos) return of(this.planetasApi)
    else this.planetasObtenidos = true;
    return this.fetchApi().pipe(
      map(planetas => {
        this.planetasApi = planetas;
        return planetas;
      }))
  }

  /**
   * Función que retorna los planetas de la api en 
   * el formato deseado
   * @returns Observable con los planetas en un array
   */
  fetchApi(): Observable<InterfazPlaneta[]> {
    return this.http.get<any>(this.url).pipe(
      map(data => data.results.map((planeta: any) => {
        let planetaNuevo = new ClasePlaneta(this.idDisponible(), planeta.name, planeta.rotation_period, planeta.orbital_period, planeta.climate);
        return planetaNuevo;
      }))
    );
  };

  /**
   * Funcion que devuelve un planeta pasandole un id
   * @param id del planeta
   * @returns planeta buscado
   */
  getPlaneta(id: number): Observable<InterfazPlaneta> {
    let planeta = this.planetasApi.find(planetaBuscado => planetaBuscado.id === id)!;
    return of(planeta);
  }

  /**
   * Funcion que retorna el siguiente id dispodible
   * @returns id disponible
   */
  idDisponible(): number {
    this.ultimoId = this.ultimoId + 1
    return this.ultimoId;
  }
}
