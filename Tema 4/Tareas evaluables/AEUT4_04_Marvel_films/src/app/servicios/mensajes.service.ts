import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

/**
 * Mensaje que guarda un registro de lo ocurrido en la pagina
 */
export class MensajesService {

    /**
     * Variable que guard los mensajes
     */
    mensajes: string[] = [];

    /**
     * Metodo que muestra los mensajes por 
     * console.log
     * @param mensaje mensaje a mostrar
     */
    log(mensaje: string): void {
        console.log(mensaje);
    }

    /**
     * Metodo que muestra todos los mensajes de la aplicacion
     */
    enseniarTodos(): void {
        this.mensajes.forEach(mensaje => {
            this.log(mensaje);
        });
    }

    /**
     * Metodo que anide mensajs a la aplicacion 
     * @param mensaje mensaje a mostrar
     */
    aniadir(mensaje: string): void {
        this.log(mensaje);
        this.mensajes.push(mensaje);
    }

    /**
     * Metododo que borra los mensajes del historial
     */
    limpiar(): void {
        this.mensajes = [];
    }
}
