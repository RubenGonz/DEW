import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MensajesService {

    mensajes: string[] = [];

    log(mensaje: string): void {
        console.log(mensaje);
    }

    enseniarTodos(): void {
        this.mensajes.forEach(mensaje => {
            this.log(mensaje);
        });
    }

    aniadir(mensaje: string): void {
        this.log(mensaje);
        this.mensajes.push(mensaje);
    }

    limpiar(): void {
        this.mensajes = [];
    }
}
