import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sinopsisPelicula'
})

/**
 * Pipe que transforma una sinopsis larga a una
 * mas corta con la opcion de un boton para leer la
 * sinopsis completa
 */
export class SinopsisPeliculaPipe implements PipeTransform {

    transform(sinopsis: string): void {
        let div = document.getElementById("sinopsis");
        div!.innerHTML = "";
        let sinopsisInicial;

        if (sinopsis.length > 300) {
            sinopsisInicial = sinopsis.substring(0, 300);
            let sinopsisOculta = sinopsis.substring(300);

            let primeraParte = document.createElement("span");
            primeraParte.innerHTML = sinopsisInicial;
            div?.appendChild(primeraParte);

            let leerMas = document.createElement("span");
            leerMas.id = "LeerMas";
            leerMas.innerHTML = "... Leer más";
            leerMas.style.color = "blue";
            leerMas.addEventListener("click", () => this.mostrarMas(sinopsisOculta));
            div?.appendChild(leerMas);
        } else {
            let span = document.createElement("span");
            span.innerHTML = sinopsis;
            div?.appendChild(span);
        }
    }

    /**
     * Metodo que muestra la sinopsis completa 
     * quitando el boton le leer mas y aniadiendo 
     * el de leer menos
     * @param sinopsisOculta texto oculto
     */
    mostrarMas(sinopsisOculta: string) {
        let parteExtendida = document.createElement("span");
        parteExtendida.id = "sinopsisExtendida";
        parteExtendida.innerHTML = sinopsisOculta;

        let leerMenos = document.createElement("span");
        leerMenos.id = "LeerMenos"
        leerMenos.innerHTML = " Leer menos";
        leerMenos.style.color = "blue";
        leerMenos.addEventListener("click", () => this.mostrarMenos(sinopsisOculta));

        document.getElementById("LeerMas")?.insertAdjacentElement("afterend", parteExtendida);
        document.getElementById("sinopsis")?.insertAdjacentElement("beforeend", leerMenos);
        document.getElementById("LeerMas")?.remove();
    }

    /**
     * Metodo que oculta la sinopsis completa 
     * quitando el boton le leer menos y aniadiendo 
     * el de leer mas
     * @param sinopsisOculta texto oculto
     */
    mostrarMenos(sinopsisOculta: string) {
        document.getElementById("sinopsisExtendida")?.remove();
        document.getElementById("LeerMenos")?.remove();

        let leerMas = document.createElement("span");
        leerMas.id = "LeerMas";
        leerMas.innerHTML = "... Leer más";
        leerMas.style.color = "blue";
        leerMas.addEventListener("click", () => this.mostrarMas(sinopsisOculta));
        document.getElementById("sinopsis")?.insertAdjacentElement("beforeend", leerMas);
    }

}
