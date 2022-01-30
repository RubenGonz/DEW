import { Component, OnInit } from '@angular/core';

import { InterfazPelicula } from 'src/app/interfaces/pelicula';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { PELICULAS } from 'src/app/mocks/mock-peliculas';

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

    validarPeliculaAModificar(): boolean {
        let valoresInputs = this.obtenerDatosModificarPeli();
        let valoresValidos = true;
        let partesFecha = valoresInputs[2].split("/");
        let fecha = partesFecha[1] + "/" + partesFecha[0] + "/" + partesFecha[2];

        if (valoresInputs[0] == "") valoresValidos = false;
        if (valoresInputs[1] == "") valoresValidos = false;
        if (isNaN(Date.parse(fecha))) valoresValidos = false;
        if (valoresInputs[3] == "") valoresValidos = false;

        return valoresValidos;
    }

    obtenerDatosModificarPeli(): any[] {
        let inputsObtenidos = document.getElementsByName("formModificarPelicula");
        let valoresInputs: any[] = [];
        inputsObtenidos.forEach(htmlElement => {
            let htmlInput = htmlElement as HTMLInputElement;
            valoresInputs.push(htmlInput.value.trim());
        })
        if (valoresInputs[4].toLowerCase() == "si" || valoresInputs[4].toLowerCase() == "sí") valoresInputs[4] = true;
        else valoresInputs[4] = false;
        return valoresInputs;
    }

    modificarPelicula(): void {
        if (this.validarPeliculaAModificar()) {
            const id = Number(this.route.snapshot.paramMap.get('id'));
            let datos = this.obtenerDatosModificarPeli();
            this.peliculaService.modificarPelicula(id,datos);
            document.getElementById("botonCrearFormularioModificar")!.innerHTML = "Modificar pelicula";
            document.getElementById("formModificarPelicula")?.classList.add("d-none");
        }
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