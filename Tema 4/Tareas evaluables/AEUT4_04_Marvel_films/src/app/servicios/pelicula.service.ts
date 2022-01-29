import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MensajesService } from './mensajes.service';

import { Pelicula } from '../interfaces/pelicula';
import { PELICULAS } from '../mocks/mock-peliculas';

@Injectable({
    providedIn: 'root'
})

export class PeliculaService {

    constructor(private mensajesService: MensajesService) { }

    getPeliculas(): Observable<Pelicula[]> {
        this.mensajesService.aniadir("Peliculas obtenidas con éxito")
        return of(PELICULAS);
    }
}
