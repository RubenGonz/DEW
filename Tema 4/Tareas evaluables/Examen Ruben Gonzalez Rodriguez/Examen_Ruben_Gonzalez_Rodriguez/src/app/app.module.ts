import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';

import { ListaPlanetasComponent } from './componentes/lista-planetas/lista-planetas.component';
import { PlanetaDetalladoComponent } from './componentes/planeta-detallado/planeta-detallado.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component'; 
import { PieComponent } from './componentes/pie/pie.component';
import { ClimaPipe } from './pipes/clima.pipe';
import { RotacionPipe } from './pipes/rotacion.pipe'; 
import { TraslacionPipe } from './pipes/traslacion.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    ListaPlanetasComponent,
    PlanetaDetalladoComponent,
    CabeceraComponent,
    PieComponent,
    ClimaPipe,
    RotacionPipe,
    TraslacionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
