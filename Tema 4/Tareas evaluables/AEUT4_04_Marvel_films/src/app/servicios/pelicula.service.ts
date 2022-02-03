import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { InterfazPelicula } from '../interfaces/pelicula';
import { ClasePelicula } from '../clases/pelicula';

@Injectable({
    providedIn: 'root'
})

/**
 * Servicio que se ocupa del manejo 
 * de las peliculas de nuestra aplicacion
 */
export class PeliculaService {

    peliculasApi: InterfazPelicula[] = [];
    peliculasObtenidas: boolean = false;
    url: string = "https://mcuapi.herokuapp.com/api/v1/movies";

    constructor(private http: HttpClient) { }

    /**
     * Funcion que retorna un observable con las peliculas de la 
     * api en el caso de que no se hayan obtenido nunca o las peliculas
     * actuales del servicio
     * @returns Observable con las peliculas en un array
     */
    getPeliculas(): Observable<InterfazPelicula[]> {
        if (this.peliculasObtenidas) return of(this.peliculasApi) 
        else this.peliculasObtenidas = true;
        return this.fetchApi().pipe(
            map(peliculas => {
                this.peliculasApi = peliculas;
                return peliculas;
            }))
    }

    /**
     * Función que retorna las peliculas de la api en 
     * el formato deseado
     * @returns Observable con las peliculas en un array
     */
    fetchApi(): Observable<InterfazPelicula[]> {
        return this.http.get<any>(this.url).pipe(
            map(data => data.data.map((pelicula: any) => {
                let peliculaNueva = new ClasePelicula(pelicula.id, pelicula.title, pelicula.cover_url, pelicula.release_date, pelicula.overview, true);
                return peliculaNueva;
            }))
        );
    };

    /**
     * Funcion que devuelve una pelicula psandole un id
     * @param id de la pelicula
     * @returns pelicula buscada
     */
    getPelicula(id: number): Observable<InterfazPelicula> {
        let pelicula = this.peliculasApi.find(peliculaBuscada => peliculaBuscada.id === id)!;
        return of(pelicula);
    }

    /**
     * Metodo que aniade una pelicula al array 
     * de PELICULAS
     * @param pelicula a aniadir
     */
    addPelicula(pelicula: InterfazPelicula): void {
        this.peliculasApi.push(pelicula);
    }

    /**
     * Metodo que elimina una pelicula del array 
     * de PELICULAS
     * @param id de la pelicula a eliminar
     */
    eliminarPelicula(id: number): void {
        this.getPelicula(id).subscribe(peliculaAEliminar => {
            let indice = this.peliculasApi.indexOf(peliculaAEliminar);
            if (indice != -1) this.peliculasApi.splice(indice, 1);
        });
    }

    /**
     * Metodo que modifica una pelicula del array 
     * de PELICULAS
     * @param id de la pelicula
     * @param datos nuevos datos a cambiar
     */
    modificarPelicula(id: number, datos: any[]) {
        let indicePelicula: number = -1;
        this.peliculasApi.find((peliculaBuscada: InterfazPelicula) => {
            if (peliculaBuscada.id === id) indicePelicula = this.peliculasApi.indexOf(peliculaBuscada);
        });
        this.peliculasApi[indicePelicula].nombre = datos[0];
        this.peliculasApi[indicePelicula].urlImagen = datos[1];
        this.peliculasApi[indicePelicula].fechaSalida = datos[2];
        this.peliculasApi[indicePelicula].sinopsis = datos[3];
        this.peliculasApi[indicePelicula].esMarvel = datos[4];
    }

    /**
     * Funcion que retorna el siguiente id dispodible
     * @returns id disponible
     */
    idDisponible(): number {
        let id = this.peliculasApi[this.peliculasApi.length - 1].id;
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