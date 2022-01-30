import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MensajesService } from './mensajes.service';

import { InterfazPelicula } from '../interfaces/pelicula';
import { PELICULAS } from '../mocks/mock-peliculas';

@Injectable({
    providedIn: 'root'
})

export class PeliculaService {

    constructor(private mensajesService: MensajesService) { }

    getPeliculas(): Observable<InterfazPelicula[]> {
        this.mensajesService.aniadir("Peliculas obtenidas con éxito")
        return of(PELICULAS);
    }

    getPelicula(id: number): Observable<InterfazPelicula> {
        const pelicula = PELICULAS.find(peliculaBuscada => peliculaBuscada.id === id)!;
        this.mensajesService.aniadir("Pelicula encontrada con éxito");
        return of(pelicula);
    }

    addPelicula(pelicula: InterfazPelicula): void {
        PELICULAS.push(pelicula);
    }

    eliminarPelicula(id: number): void {
        this.getPelicula(id).subscribe(peliculaAEliminar => {
            let indice = PELICULAS.indexOf(peliculaAEliminar);
            if (indice != -1) PELICULAS.splice(indice, 1)
        });
    }

    modificarPelicula() {
        
    }

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