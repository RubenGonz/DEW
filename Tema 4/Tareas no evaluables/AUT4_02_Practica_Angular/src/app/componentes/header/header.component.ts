import { Component } from '@angular/core';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    rutaImgLogo: string;

    constructor() {
        this.rutaImgLogo = "../../../assets/img/logo.png"
    }
}