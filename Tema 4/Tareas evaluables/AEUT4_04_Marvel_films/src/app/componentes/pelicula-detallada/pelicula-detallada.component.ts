import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/pelicula';

@Component({
    selector: 'pelicula-detallada',
    templateUrl: './pelicula-detallada.component.html',
    styleUrls: ['./pelicula-detallada.component.css']
})
export class PeliculaDetalladaComponent implements OnInit {

    @Input() pelicula?: Pelicula;

    constructor() { }

    ngOnInit(): void {
    }

}