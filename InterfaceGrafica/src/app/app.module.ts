import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListaComponent } from './components/listas/lista/lista.component';
import { AsignacionComponent } from './components/asignacion/asignacion/asignacion.component';
import { JefesComponent } from './components/jefes/jefes.component';
import { FechasComponent } from './components/fechas/fechas.component';
<<<<<<< HEAD
import { MaestrosComponent } from './components/maestros/maestros.component';
=======
import { CompatibilidadComponent } from './components/compatibilidad/compatibilidad.component';
>>>>>>> 324c16bf8c2f5d8c65d401a849db9b32582cd2e9


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    DepartamentoComponent,
    ListaComponent,
    AsignacionComponent,
    JefesComponent,
    FechasComponent,
<<<<<<< HEAD
    MaestrosComponent
=======
    CompatibilidadComponent
>>>>>>> 324c16bf8c2f5d8c65d401a849db9b32582cd2e9
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
