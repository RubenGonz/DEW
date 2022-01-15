import { Component } from '@angular/core';

@Component({
    selector: 'main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent {
    listaProductos: string[];

    constructor() {
        this.listaProductos = ["Cereza", "Coco", "Platano"];
    }
}