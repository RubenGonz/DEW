import { Component, OnInit } from '@angular/core';
import { InterfazPelicula } from 'src/app/interfaces/pelicula';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

/**
 * Componente Home que muestra la página 
 */
export class HomeComponent implements OnInit {

    peliculasHome: InterfazPelicula[] = [];

    /**
     * Constructor del componente que inicializa PeliculaService
     * @param peliculaService servicio que gestiona las peliculas
     */
    constructor(private peliculaService: PeliculaService) { }

    ngOnInit(): void {
        this.getPeliculas();
    }

    /**
     * Metodo que recoge las peliculas del servicio
     */
    getPeliculas(): void {
        this.peliculaService.getPeliculas().subscribe(peliculasApi => this.peliculasHome = peliculasApi.slice(0,8));
    }

}
