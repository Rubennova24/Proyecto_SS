import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { HomeComponent } from './components/home/home.component';
import { ListaComponent } from './components/listas/lista/lista.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'departamento', component:DepartamentoComponent},
  {path: 'lista', component:ListaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
