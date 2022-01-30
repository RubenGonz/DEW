import { Component, OnInit } from '@angular/core';

import { InterfazPelicula } from 'src/app/interfaces/pelicula';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
    selector: 'pelicula-detallada',
    templateUrl: './pelicula-detallada.component.html',
    styleUrls: ['./pelicula-detallada.component.css']
})
export class PeliculaDetalladaComponent implements OnInit {

    pelicula: InterfazPelicula | undefined;

    constructor(private route: ActivatedRoute, private peliculaService: PeliculaService, private location: Location) { }

    ngOnInit(): void {
        this.getPelicula();
    }

    getPelicula(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.peliculaService.getPelicula(id).subscribe(peliculaBuscada => this.pelicula = peliculaBuscada);
    }

    crearFormularioModificarPeli(): void {
        let formulario = document.getElementById("formModificarPelicula");
        let boton = document.getElementById("botonCrearFormularioModificar");

        if (formulario?.classList.contains("d-none")) {
            boton!.innerHTML = "Ocultar formulario";
            formulario?.classList.remove("d-none");
        } else {
            boton!.innerHTML = "Modificar pelicula";
            formulario?.classList.add("d-none");
        }
    }

    modificarPelicula(): void {
        console.log("Hola")
    }

    eliminarPelicula(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.peliculaService.eliminarPelicula(id);
        this.goBack();
    }

    goBack(): void {
        this.location.back();
    }

}