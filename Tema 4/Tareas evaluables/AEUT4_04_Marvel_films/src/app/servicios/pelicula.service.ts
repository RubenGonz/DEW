import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MensajesService } from './mensajes.service';

import { InterfazPelicula } from '../interfaces/pelicula';
import { PELICULAS } from '../mocks/mock-peliculas';

@Injectable({
    providedIn: 'root'
})

/**
 * Servicio que se ocupa del manejo 
 * de las peliculas de nuestra aplicacion
 */
export class PeliculaService {

    /**
     * Constructor que inicializa el servicio de mensajes
     * @param mensajesService servicio de mensajes
     */
    constructor(private mensajesService: MensajesService) { }

    /**
     * Funcion que obtiene las peliculas de neustro mock
     * @returns array de peliculas
     */
    getPeliculas(): Observable<InterfazPelicula[]> {
        this.mensajesService.aniadir("Peliculas obtenidas con éxito")
        return of(PELICULAS);
    }

    /**
     * Funcion que devuelve una pelicula psandole un id
     * @param id de la pelicula
     * @returns pelicula buscada
     */
    getPelicula(id: number): Observable<InterfazPelicula> {
        const pelicula = PELICULAS.find(peliculaBuscada => peliculaBuscada.id === id)!;
        this.mensajesService.aniadir("Pelicula encontrada con éxito");
        return of(pelicula);
    }

    /**
     * Metodo que aniade una pelicula al array 
     * de PELICULAS
     * @param pelicula a aniadir
     */
    addPelicula(pelicula: InterfazPelicula): void {
        PELICULAS.push(pelicula);
    }

    /**
     * Metodo que elimina una pelicula del array 
     * de PELICULAS
     * @param id de la pelicula a eliminar
     */
    eliminarPelicula(id: number): void {
        this.getPelicula(id).subscribe(peliculaAEliminar => {
            let indice = PELICULAS.indexOf(peliculaAEliminar);
            if (indice != -1) PELICULAS.splice(indice, 1)
        });
    }

    /**
     * Metodo que modifica una pelicula del array 
     * de PELICULAS
     * @param id de la pelicula
     * @param datos nuevos datos a cambiar
     */
    modificarPelicula(id: number, datos: any[]) {
        let indicePelicula:number = -1;
        PELICULAS.find(peliculaBuscada => {
            if (peliculaBuscada.id === id) indicePelicula = PELICULAS.indexOf(peliculaBuscada);
        });
        PELICULAS[indicePelicula].nombre = datos[0];
        PELICULAS[indicePelicula].urlImagen = datos[1];
        PELICULAS[indicePelicula].fechaSalida = datos[2];
        PELICULAS[indicePelicula].sinopsis = datos[3];
        PELICULAS[indicePelicula].esMarvel = datos[4];
    }

    /**
     * Funcion que retorna el siguiente id dispodible
     * @returns id disponible
     */
    idDisponible(): number {
        let id = PELICULAS[PELICULAS.length - 1].id;
        let idLibreEcontrado = false;
        while (!idLibreEcontrado) {
            let peliculaEnBucle: any;
            id = id + 1;
            this.getPelicula(id).subscribe(peliculaEncontrada => peliculaEnBucle = peliculaEncontrada);
            if (peliculaEnBucle == undefined) idLibreEcontrado = true;
        }
        return id;
    }
}