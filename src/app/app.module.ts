import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { InicioComponent } from './inicio/inicio.component';
import { TrabajoComponent } from './trabajo/trabajo.component';
import { AlgoritmoComponent } from './algoritmo/algoritmo.component';
import { AlgoritmoDashboardComponent } from './algoritmo-dashboard/algoritmo-dashboard.component';

/*****************   Servicios   ***************/
import { AlgoritmoService } from './services/algoritmo.service';

import { FormsModule } from '@angular/forms';
import { EjecucionComponent } from './ejecucion/ejecucion.component';
import { ClusterComponent } from './cluster/cluster.component';
import { ClusterNodeCardComponent } from './cluster-node-card/cluster-node-card.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    InicioComponent,
    TrabajoComponent,
    AlgoritmoComponent,
    AlgoritmoDashboardComponent,
    EjecucionComponent,
    ClusterComponent,
    ClusterNodeCardComponent,
    AcercaDeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AlgoritmoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
