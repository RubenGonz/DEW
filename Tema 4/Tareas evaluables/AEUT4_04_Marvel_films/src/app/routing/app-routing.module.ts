import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaPeliculasComponent } from '../componentes/lista-peliculas/lista-peliculas.component';
import { PeliculaDetalladaComponent } from '../componentes/pelicula-detallada/pelicula-detallada.component';

const routes: Routes = [
  { path: "", redirectTo: "/listaPeliculas", pathMatch: "full" },
  { path: "listaPeliculas", component: ListaPeliculasComponent },
  { path: "peliculaDetallada/:id", component: PeliculaDetalladaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
