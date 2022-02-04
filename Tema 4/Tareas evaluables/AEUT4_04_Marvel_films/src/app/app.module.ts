import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';

import { ListaPeliculasComponent } from './componentes/lista-peliculas/lista-peliculas.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PieComponent } from './componentes/pie/pie.component';
import { PeliculaDetalladaComponent } from './componentes/pelicula-detallada/pelicula-detallada.component';
import { FasePeliculaPipe } from './pipes/fase-pelicula.pipe';
import { NombrePeliculaPipe } from './pipes/nombre-pelicula.pipe';
import { SinopsisPeliculaPipe } from './pipes/sinopsis-pelicula.pipe';
import { HomeComponent } from './componentes/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        ListaPeliculasComponent,
        CabeceraComponent,
        PieComponent,
        PeliculaDetalladaComponent,
        FasePeliculaPipe,
        NombrePeliculaPipe,
        SinopsisPeliculaPipe,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
