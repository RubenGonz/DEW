import { Component, OnInit } from '@angular/core';

import { ClasePlaneta } from 'src/app/classes/planeta';
import { InterfazPlaneta } from 'src/app/interfaces/planeta';

import { PlanetasService } from 'src/app/services/planetas.service';

@Component({
  selector: 'lista-planetas',
  templateUrl: './lista-planetas.component.html',
  styleUrls: ['./lista-planetas.component.css']
})
export class ListaPlanetasComponent implements OnInit {

  /**
   * Variable que guarda los planetas de la pagina
   */
  planetas: InterfazPlaneta[] = [];

  /**
   * Constructor que inicializa el servicio de planetas
   * @param planetaService servicio que abastece el manejo de los planetas
   */
  constructor(private planetaService: PlanetasService) { }

  /**
   * Al construirse se obtienen los planetas
   */
  ngOnInit(): void {
    this.getPeliculas();
  }

  /**
   * Metodo que guarda los planetas del servicio
   */
  getPeliculas(): void {
    this.planetaService.getPlanetas().subscribe(planetasApi => this.planetas = planetasApi);
  }

}
