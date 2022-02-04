import { Component } from '@angular/core';
import { animacion } from './animaciones/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    animacion
  ]
})

export class AppComponent {
  
}
