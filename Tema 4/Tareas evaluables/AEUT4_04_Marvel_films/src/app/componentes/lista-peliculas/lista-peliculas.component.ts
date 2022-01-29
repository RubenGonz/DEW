import { Component, OnInit } from '@angular/core';

import { Pelicula } from '../../interfaces/pelicula';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
    selector: 'lista-peliculas',
    templateUrl: './lista-peliculas.component.html',
    styleUrls: ['./lista-peliculas.component.css']
})

export class ListaPeliculasComponent implements OnInit {

    peliculas: Pelicula[] = [];

    constructor(private peliculaService: PeliculaService) { }

    ngOnInit(): void {
        this.getPeliculas();
    }

    getPeliculas(): void {
        this.peliculaService.getPeliculas().subscribe(peliculasObtenidas => this.peliculas = peliculasObtenidas);
    }

}
