import { Component, Input } from '@angular/core';

@Component({
    selector: 'producto',
    templateUrl: './producto.component.html',
    styleUrls: ['./producto.component.css']
})

export class ProductoComponent {
    @Input() nombreProducto: string;

    constructor() {
        this.nombreProducto = "";
    }
}