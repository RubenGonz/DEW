import { Component, OnInit } from '@angular/core';

import { Pelicula } from 'src/app/interfaces/pelicula';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
    selector: 'pelicula-detallada',
    templateUrl: './pelicula-detallada.component.html',
    styleUrls: ['./pelicula-detallada.component.css']
})
export class PeliculaDetalladaComponent implements OnInit {

    pelicula: Pelicula | undefined;

    constructor(private route: ActivatedRoute, private peliculaService: PeliculaService, private location: Location) { }

    ngOnInit(): void {
        this.getPelicula();
    }

    getPelicula(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.peliculaService.getPelicula(id).subscribe(peliculaBuscada => this.pelicula = peliculaBuscada);
    }

    goBack(): void {
        this.location.back();
    }

}