import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPlanetasComponent } from '../componentes/lista-planetas/lista-planetas.component';
import { PlanetaDetalladoComponent } from '../componentes/planeta-detallado/planeta-detallado.component';

/**
 * Rutas disponibles
 */
 const routes: Routes = [
  { path: "", redirectTo: "/listaPlanetas", pathMatch: "full" },
  { path: "listaPlanetas", component: ListaPlanetasComponent },
  { path: "planetaDetallado/:id", component: PlanetaDetalladoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }