import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PeliculasComponent } from './componentes/peliculas/peliculas.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PieComponent } from './componentes/pie/pie.component';
import { ContenidoComponent } from './componentes/contenido/contenido.component';
import { PeliculaDetalladaComponent } from './componentes/pelicula-detallada/pelicula-detallada.component';

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    CabeceraComponent,
    PieComponent,
    ContenidoComponent,
    PeliculaDetalladaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
