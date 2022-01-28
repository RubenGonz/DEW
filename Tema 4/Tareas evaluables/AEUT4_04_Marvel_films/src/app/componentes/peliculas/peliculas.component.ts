import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula';
import { PELICULAS } from '../../mocks/mock-peliculas';

@Component({
    selector: 'peliculas',
    templateUrl: './peliculas.component.html',
    styleUrls: ['./peliculas.component.css']
})

export class PeliculasComponent implements OnInit {

    peliculas = PELICULAS;

    constructor() { }

    ngOnInit(): void {
    }

}
