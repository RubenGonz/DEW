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

/**
 * Clase que construye el componente que lista los detalles de una pelicula
 */
export class PeliculaDetalladaComponent implements OnInit {

    pelicula: InterfazPelicula | undefined;

    /**
     * Constructor que inicializa algunos servicios y 
     * herramientas para el routing
     * @param route herramienta para el routing
     * @param peliculaService servicio de las peliculas
     * @param location herramienta para el routing
     */
    constructor(private route: ActivatedRoute, private peliculaService: PeliculaService, private location: Location) { }

    /**
     * Obtiene la pelicula al empezar el servicio
     */
    ngOnInit(): void {
        this.getPelicula();
    }

    /**
     * Metodo que obtiene la pelicula usando la Url
     */
    getPelicula(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.peliculaService.getPelicula(id).subscribe(peliculaBuscada => this.pelicula = peliculaBuscada);
    }

    /**
     * Metodo que crea el formulario para 
     * modififcar una pelicula
     */
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

    /**
     * Metodo que valida los datos del formulario 
     * @returns true si es valido o false si no lo es
     */
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

    /**
     * Metodo que obtiene los datos del formulario
     * @returns array con los datos del formulario
     */
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

    /**
     * Metodo que reune los datos de la pelicula
     * y la manda al servicio de peliculas
     */
    modificarPelicula(): void {
        if (this.validarPeliculaAModificar()) {
            const id = Number(this.route.snapshot.paramMap.get('id'));
            let datos = this.obtenerDatosModificarPeli();
            this.peliculaService.modificarPelicula(id, datos);
            document.getElementById("botonCrearFormularioModificar")!.innerHTML = "Modificar pelicula";
            document.getElementById("formModificarPelicula")?.classList.add("d-none");
        }
    }

    /**
     * Metodo que obtiene la informacion de 
     * una pelicula y la manda al servicio de 
     * peliculas
     */
    eliminarPelicula(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.peliculaService.eliminarPelicula(id);
        this.goBack();
    }

    /**
     * Vuelve a la pagina anterior a la que estabas
     */
    goBack(): void {
        this.location.back();
    }

}