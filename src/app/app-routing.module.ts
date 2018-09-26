import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { TrabajoComponent } from './trabajo/trabajo.component';
import { AlgoritmoDashboardComponent } from './algoritmo-dashboard/algoritmo-dashboard.component';
import { EjecucionComponent } from './ejecucion/ejecucion.component';
import { ClusterComponent } from  './cluster/cluster.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';

const routes: Routes = [ 
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'trabajos', component: TrabajoComponent},
  { path: 'cluster', component: ClusterComponent},
  { path: 'trabajos/algoritmo/:id', component: AlgoritmoDashboardComponent},
  { path: 'trabajos/ejecucion/:id', component: EjecucionComponent},
  { path: 'acerca_de', component: AcercaDeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
