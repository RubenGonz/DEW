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

    crearFormulario(): void {
        let formulario = document.getElementById("formNuevaPelicula");
        let boton = document.getElementById("botonCrearFormulario");

        if (formulario?.classList.contains("d-none")) {
            boton!.innerHTML = "Ocultar formulario";
            formulario?.classList.remove("d-none");
        } else {
            boton!.innerHTML = "Añadir pelicula";
            formulario?.classList.add("d-none");
        }
    }

    aniadirPelicula(): void {
        let inputsObtenidos = document.getElementsByName("formNuevaPelicula");
        let valoresInputs = [];
        let valoresValidos = true;
        inputsObtenidos.forEach(htmlElement => {
            let htmlInput = htmlElement as HTMLInputElement;
            valoresInputs.push(htmlInput.value);
        })
    }
}
