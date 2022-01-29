import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';

import { ListaPeliculasComponent } from './componentes/lista-peliculas/lista-peliculas.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PieComponent } from './componentes/pie/pie.component';
import { PeliculaDetalladaComponent } from './componentes/pelicula-detallada/pelicula-detallada.component';
import { FasePeliculaPipe } from './pipes/fase-pelicula.pipe';
import { NombrePeliculaPipe } from './pipes/nombre-pelicula.pipe';
import { SinopsisPeliculaPipe } from './pipes/sinopsis-pelicula.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ListaPeliculasComponent,
        CabeceraComponent,
        PieComponent,
        PeliculaDetalladaComponent,
        FasePeliculaPipe,
        NombrePeliculaPipe,
        SinopsisPeliculaPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
