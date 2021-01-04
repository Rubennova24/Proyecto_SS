import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from './../../services/bdservice.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  loggeado:string;
  tipo:string;
  departamento: any;
  centro = "CCBAS";
  materias: any;
  carreras: any;

  nombre = "";
  semestre = "";
  codigo = "";
  carrera = "";

  nuevo_nom = "";
  nuevo_sem = "";
  mat_editar = "";
  cod_editar = "";
  car_editar = "";
  constructor(private bdservice:BdserviceService, private router:Router) { }

  ngOnInit(): void {
    this.loggeado = this.bdservice.getSession();
    this.tipo = this.bdservice.getTipo();
    if(this.loggeado == "" || this.tipo == "Centro"){
      this.router.navigate(['/inicio']);
    }
    this.departamento= this.bdservice.getUsrDpto();
    this.mostrar_materias();
    this.bdservice.getCarreras().subscribe(
      (carrs) => {this.carreras = carrs}
    )
  }
  mostrar_materias(){
    this.bdservice.getMaterias(this.departamento).subscribe(
      (datos) => {this.materias=datos}
    )
  }
  delete(mat){
    if(confirm("Desea eliminar la Materia: "+ mat.Nombre)) {
     // console.log(mat.Codigo,mat.Carrera);
      this.bdservice.eliminar_mat(mat.Codigo, mat.Carrera).subscribe(data=>{
      })
    }
    this.mostrar_materias();
  }
  editar(mat){    //funcion para
    this.nuevo_nom = mat.Nombre;
    this.nuevo_sem = mat.Semestre;

    this.mat_editar = mat.Nombre;
    this.cod_editar = mat.Codigo;
    this.car_editar = mat.Carrera;
  }
  actualizar(){ //confirmar la edicion
   // console.log(this.nuevo_nom, this.nuevo_sem, this.cod_editar, this.car_editar);
    this.bdservice.editar_mat(this.nuevo_nom, this.nuevo_sem, this.cod_editar, this.car_editar).subscribe(data=>{
     // console.log(data)
    });
    alert("Datos modificados satisfactoriamente");
    this.mostrar_materias();
    this.nuevo_nom = "";
    this.nuevo_sem = "";
  }
  guardar(cod:string, nom:string, sem:string, carr: string ){
    var dpto = this.departamento;
    //console.log(cod, nom,sem, dpto, this.centro, carr);
    this.bdservice.registrar_mat(cod, nom, sem, this.centro, carr, dpto).subscribe(
      (data)=>{// {console.log(data)
    });
    alert("Materia registrada satisfactoriamente")
    this.mostrar_materias();
        this.nombre="";
        this.codigo="";
        this.semestre="";
        this.carrera = "";
  }
}
