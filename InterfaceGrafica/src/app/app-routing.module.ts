import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { HomeComponent } from './components/home/home.component';
import { ListaComponent } from './components/listas/lista/lista.component';
import { AsignacionComponent } from './components/asignacion/asignacion/asignacion.component';
import { JefesComponent } from './components/jefes/jefes.component';


const routes: Routes = [
  {path: 'inicio', component: HomeComponent},
  {path: 'asignacion', component: AsignacionComponent},
  {path: 'departamento', component:DepartamentoComponent},
  {path: 'lista', component:ListaComponent},
  {path: 'jefes', component:JefesComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
