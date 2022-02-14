import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { InterfazPlaneta } from 'src/app/interfaces/planeta';
import { PlanetasService } from 'src/app/services/planetas.service';

@Component({
  selector: 'planeta-detallado',
  templateUrl: './planeta-detallado.component.html',
  styleUrls: ['./planeta-detallado.component.css']
})
/**
 * Clase que construye el componente que lista los detalles de una planeta
 */
export class PlanetaDetalladoComponent implements OnInit {

  /**
   * Variable que guarda el planeta de la pagina
   */
  planeta: InterfazPlaneta | undefined;

  /**
   * Constructor que inicializa algunos servicios y 
   * herramientas para el routing
   * @param route herramienta para el routing
   * @param planetaService servicio de las planetas
   * @param location herramienta para el routing
   */
  constructor(private route: ActivatedRoute, private planetaService: PlanetasService, private location: Location) { }

  /**
   * Obtiene el planeta al empezar el servicio
   */
  ngOnInit(): void {
    this.getPlaneta();
  }

  /**
   * Metodo que obtiene el planeta usando la Url
   */
  getPlaneta(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.planetaService.getPlaneta(id).subscribe(planetaBuscado => this.planeta = planetaBuscado);
  }

}