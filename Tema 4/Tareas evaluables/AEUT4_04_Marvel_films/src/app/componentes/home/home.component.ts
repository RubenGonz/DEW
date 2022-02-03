import { Component, OnInit } from '@angular/core';
import { InterfazPelicula } from 'src/app/interfaces/pelicula';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    peliculasHome: InterfazPelicula[] = [];

    constructor(private peliculaService: PeliculaService) { }

    ngOnInit(): void {
        this.getPeliculas();
    }

    getPeliculas(): void {
        this.peliculaService.getPeliculas().subscribe(peliculasApi => this.peliculasHome = peliculasApi.slice(0,8));
    }

}
