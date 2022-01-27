import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PeliculaComponent } from './componentes/pelicula/pelicula.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PieComponent } from './componentes/pie/pie.component';
import { ContenidoComponent } from './componentes/contenido/contenido.component';

@NgModule({
  declarations: [
    AppComponent,
    PeliculaComponent,
    CabeceraComponent,
    PieComponent,
    ContenidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
