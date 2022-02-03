import { Component, OnInit } from '@angular/core';

import { InterfazPelicula } from 'src/app/interfaces/pelicula';
import { ClasePelicula } from '../../clases/pelicula';

import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
    selector: 'lista-peliculas',
    templateUrl: './lista-peliculas.component.html',
    styleUrls: ['./lista-peliculas.component.css']
})

/**
 * Clase que construye el componente que lista las peliculas
 */
export class ListaPeliculasComponent implements OnInit {

    /**
     * Variable que guarda las peliculas de la pagina
     */
    peliculas: InterfazPelicula[] = [];

    /**
     * Constructor que inicializa el servicio de mensajes y peliculas
     * @param peliculaService servicio que abastece el manejo de las peliculas
     * @param mensajesService servicio que abastece el manejo de los mensajes
     */
    constructor(private peliculaService: PeliculaService, private mensajesService: MensajesService) { }

    /**
     * Al construirse se obtienen las peliculas
     */
    ngOnInit(): void {
        this.getPeliculas();
    }

    /**
     * Metodo que guarda las peliculas del servicio
     */
    getPeliculas(): void {
        this.peliculaService.getPeliculas().subscribe(peliculasApi => this.peliculas = peliculasApi);
    }

    /**
     * Metodo que crea el formulario para crear una nueva pelicula
     */
    crearFormularioNuevaPeli(): void {
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

    /**
     * Metodo que devuelve los valores rellenados por los usuarios
     * @returns array con los valores de los inputs
     */
    obtenerDatosNuevaPeli(): any[] {
        let inputsObtenidos = document.getElementsByName("formNuevaPelicula");
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
     * Metodo que valida los datos del formulario
     * @returns true si es valido o false si no lo es
     */
    validarPelicula(): boolean {
        let valoresInputs = this.obtenerDatosNuevaPeli();
        let valoresValidos = true;
        let partesFecha = valoresInputs[2].split("/");
        let fecha = partesFecha[1] + "/" + partesFecha[0] + "/" + partesFecha[2];

        if (valoresInputs[0] == "") valoresValidos = false;
        if (isNaN(Date.parse(fecha))) valoresValidos = false;
        if (valoresInputs[3] == "") valoresValidos = false;

        return valoresValidos;
    }

    /**
     * Metodo que construye una pelicula y 
     * la manda al servicio para aniadirla
     */
    aniadirPelicula(): void {
        if (this.validarPelicula()) {
            let valores = this.obtenerDatosNuevaPeli();
            let peliculaPorAniadir: InterfazPelicula = new ClasePelicula(this.peliculaService.idDisponible(), valores[0], valores[1], valores[2], valores[3], valores[4]);
            this.peliculaService.addPelicula(peliculaPorAniadir);
            this.mensajesService.aniadir("La película ha sido introducida con éxito");
            document.getElementById("formNuevaPelicula")?.classList.add("d-none");
            document.getElementById("botonCrearFormulario")!.innerHTML = "Añadir pelicula";
        } else {
            this.mensajesService.aniadir("La película introducida no es válida");
        }
    }

}
