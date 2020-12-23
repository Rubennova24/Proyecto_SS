import { Component, OnInit, NgModule } from '@angular/core';
import { data } from 'jquery';
import { BdserviceService } from './../../services/bdservice.service';

@Component({
  selector: 'app-jefes',
  templateUrl: './jefes.component.html',
  styleUrls: ['./jefes.component.css']
})
export class JefesComponent implements OnInit {
  jefes:any
  dptos:any
  jefes_centro:any

  nombre = ""
  clave = ""
  password = ""
  departamento = 0
  jefe = 0

  jefe_editar = ""
  id_jefe = " "

  nuevo_nom = ""
  nueva_pass = ""
  dpto_ed = 0
  jefe_ed = 0

  constructor(private bdserviceService:BdserviceService) { }

  ngOnInit(): void {
    this.mostrar_jefes()
    this.bdserviceService.getDptosJefes().subscribe(data=>{
      this.dptos=data;
    })
    this.bdserviceService.getJefes_centro().subscribe(data=>{
      this.jefes_centro=data
      //console.log(this.jefes_centro);
    })
  }
  mostrar_jefes(){
    this.bdserviceService.getJefes().subscribe(data=>{
      this.jefes=data;
    });
  }
  opcion(){}
  opcion2(){}
  editar(jefe){    //funcion para
    console.log(jefe);
    this.nuevo_nom = jefe.Nombre;
    this.nueva_pass = jefe.Contrasena;
    this.dpto_ed = jefe.Dpto;
    this.jefe_ed = jefe.JefeCentro;

    this.jefe_editar = jefe.Nombre;
    this.id_jefe = jefe.Id;
  }
  actualizar(dpto: string, jefe: string){ //confirmar la edicion
    console.log( this.id_jefe, this.nuevo_nom,this.nueva_pass,this.dpto_ed,this.jefe_ed);
    this.bdserviceService.editar(this.id_jefe,this.nuevo_nom,this.nueva_pass, dpto, jefe).subscribe(data=>{
      console.log(data);
    });
    alert("Datos modificados satisfactoriamente");
    this.mostrar_jefes();
    this.nuevo_nom = ""
    this.nueva_pass = ""
    this.dpto_ed = 0
    this.jefe_ed = 0
  }
  delete(jf){
    console.log(jf);
    if(confirm("Desea eliminar el Jefe: "+ jf.Nombre)) {
      this.bdserviceService.eliminar(jf.Id).subscribe(data=>{
        console.log(data);
      })
    }
    this.mostrar_jefes()
  }
  guardar(nom:string, id:string, pass:string, dpto:string, jefe:string){
    console.log(nom,id,pass,dpto,jefe);
    this.bdserviceService.getJefe(id).subscribe(data=>{
      if(Object.keys(data).length != 0){ //ya esta ese id
        alert("Id existente, intente con otro");
      }else{
        this.bdserviceService.registrar(id,nom,pass,dpto,jefe).subscribe(data=>{
          console.log(data);
        });
        alert("Jefe registrado satisfactoriamente");
        this.mostrar_jefes();
        this.nombre=""
        this.password=""
        this.clave=""
        this.departamento =0
        this.jefe = 0
      }
    });
  }

}
