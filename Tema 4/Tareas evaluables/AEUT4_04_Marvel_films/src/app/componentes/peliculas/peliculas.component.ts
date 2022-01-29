import { Component, OnInit } from '@angular/core';

import { Pelicula } from '../../interfaces/pelicula';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
    selector: 'peliculas',
    templateUrl: './peliculas.component.html',
    styleUrls: ['./peliculas.component.css']
})

export class PeliculasComponent implements OnInit {

    peliculas: Pelicula[] = [];
    peliculaSeleccionada?: Pelicula;

    constructor(private peliculaService: PeliculaService) { }

    ngOnInit(): void {
        this.getPeliculas();
    }

    getPeliculas(): void {
        this.peliculaService.getPeliculas().subscribe(peliculasObtenidas => this.peliculas = peliculasObtenidas);
    }

    alPulsar(peliculaPulsada: Pelicula): void {
        this.peliculaSeleccionada = peliculaPulsada;
    }

}
