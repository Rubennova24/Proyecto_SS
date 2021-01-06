import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from './../../services/bdservice.service';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-jefes',
  templateUrl: './jefes.component.html',
  styleUrls: ['./jefes.component.css']
})
export class JefesComponent implements OnInit {
  jefes:any
  dptos:any
  jefes_centro:any
  loggeado:string;
  tipo:string;
  nombre = ""
  clave = ""
  password = ""
  departamento = 0
  jefe = 0

  jefe_editar = "" //para mostrar en el modal arriba
  id_jefe = " "

  nuevo_nom = ""
  nueva_pass = ""
  dpto_ed = 0
  jefe_ed = 0

  ultimo_registro:any

  constructor(private bdserviceService:BdserviceService, private router:Router) { }

  ngOnInit(): void {
    this.loggeado = this.bdserviceService.getSession();
    this.tipo = this.bdserviceService.getTipo();
    if(this.loggeado == "" || this.tipo == "Dpto"){
      this.router.navigate(['/inicio']);
    }
    this.mostrar_jefes()
    this.bdserviceService.getDptosJefes().subscribe(data=>{
      this.dptos=data;
    })
    this.bdserviceService.getJefes_centro().subscribe(data=>{
      this.jefes_centro=data
      //console.log(this.jefes_centro);
    })
    this.bdserviceService.modificacion().subscribe(data=>{
      let prueba = new Date(data[0].fechaCambio);
                data[0].fechaCambio = prueba.getDate()+'/'+(prueba.getMonth()+1)+'/'+prueba.getFullYear();
      this.ultimo_registro=data
      //console.log(data);
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
    //console.log(jefe);
    this.nuevo_nom = jefe.Nombre;
    this.nueva_pass = jefe.Contrasena;
    this.dpto_ed = jefe.Dpto;
    this.jefe_ed = jefe.JefeCentro;

    this.jefe_editar = jefe.Nombre;
    this.id_jefe = jefe.Id;
  }
  actualizar(dpto: string, jefe: string){ //confirmar la edicion
    //console.log( this.id_jefe, this.nuevo_nom,this.nueva_pass,this.dpto_ed,this.jefe_ed);
    this.bdserviceService.editar(this.id_jefe,this.nuevo_nom,this.nueva_pass, dpto, jefe).subscribe(data=>{
      //console.log(data);
    });
    //alert("Datos modificados satisfactoriamente");
    this.mostrar_jefes();
    this.nuevo_nom = ""
    this.nueva_pass = ""
    this.dpto_ed = 0
    this.jefe_ed = 0

  }
  delete(jf){
    //console.log(jf);
    if(confirm("Desea eliminar el Jefe: "+ jf.Nombre)) {
      this.bdserviceService.eliminar(jf.Id).subscribe(data=>{
        console.log(data);
      })
    }
    this.mostrar_jefes()
  }
  guardar(nom:string, id:string, pass:string, dpto:string, jefe:string){
    //console.log(nom,id,pass,dpto,jefe);
    this.bdserviceService.getJefe(id).subscribe(data=>{
      if(Object.keys(data).length != 0){ //ya esta ese id
        alert("Id existente, intente con otro");
      }else{
        this.bdserviceService.registrar(id,nom,pass,dpto,jefe).subscribe(data=>{
          //console.log(data);
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
  modificar_fecha(){
    this.bdserviceService.setNuevaFecha(true);
    this.router.navigate(['/fechas']);
  }
  Reporte(){
    this.bdserviceService.descargarReporteExcel().subscribe(data =>{
        saveAs(data,"reportesemestre");
    });
  }

}
