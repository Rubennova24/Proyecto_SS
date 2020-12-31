import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from './../../services/bdservice.service';

@Component({
  selector: 'app-maestros',
  templateUrl: './maestros.component.html',
  styleUrls: ['./maestros.component.css']
})
export class MaestrosComponent implements OnInit {
  loggeado:string;
  tipo:string;
  dptos:any
  departamento:any;
  centro = "CCBAS";
  maestros: any; // para guardar los maestros que se obtienen

  id_mstro = ""
  mstro_editar = "" //para mostrar en el modal arriba
  nuevo_nom = ""
  dpto_ed = 0
  ctro_ed = 0
  nombre = ""
  clave = ""
  ultimo_id: any;
  constructor(private bdserviceService:BdserviceService, private router:Router) { }

  ngOnInit(): void {
    this.loggeado = this.bdserviceService.getSession();
    this.tipo = this.bdserviceService.getTipo();
    if(this.loggeado == "" || this.tipo == "Centro"){
      this.router.navigate(['/inicio']);
    }
    this.departamento= this.bdserviceService.getUsrDpto();
    this.mostrar_maestros();
    this.bdserviceService.getDptosJefes().subscribe(data=>{
      this.dptos=data;
    })
  }
  mostrar_maestros(){
    this.bdserviceService.getMaestros(this.departamento).subscribe(data => {
      this.maestros = data;
    });
    this.bdserviceService.ultimo_id().subscribe(data => {
      this.ultimo_id = data[0].id;
    })
  }
  delete(mstro){
    console.log(mstro);
    if(confirm("Desea eliminar al Maestro: "+ mstro.Nombre)) {
      this.bdserviceService.eliminar_mstro(mstro.Nombre).subscribe(data=>{
      })
    }
    this.mostrar_maestros();
  }
  opcion(){}
  editar(mstro){    //funcion para
    console.log(mstro);
    this.nuevo_nom = mstro.Nombre;
    this.dpto_ed = mstro.Departamento;
    this.ctro_ed = mstro.Centro;

    this.mstro_editar = mstro.Nombre;
    this.id_mstro = mstro.Id;
  }
  actualizar(){ //confirmar la edicion
    this.bdserviceService.editar_mstro(this.nuevo_nom, this.id_mstro).subscribe(data=>{
      console.log(data);
    });
    alert("Datos modificados satisfactoriamente");
    this.mostrar_maestros();
    this.nuevo_nom = ""

  }
  guardar(nom:string, id:string){
    var dpto = this.departamento;
    console.log(nom,id,dpto);
    this.bdserviceService.getMaestro(id).subscribe(data=>{
      if(Object.keys(data).length != 0){ //ya esta ese id
        alert("Id existente, intente con otro");
      }else{
        this.bdserviceService.registrar_mstro(id,nom,dpto,this.centro).subscribe(data=>{
          console.log(data);
        });
        alert("Maestro registrado satisfactoriamente");
        this.mostrar_maestros();
        this.nombre=""
        this.clave=""

      }
    });
  }


}
