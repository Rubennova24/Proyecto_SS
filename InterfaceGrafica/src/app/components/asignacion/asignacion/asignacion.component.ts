import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {
  grupos: any;
  cont = [];
  tabla:boolean;
  clase:string;
  nomclase:any;
  nomclase2:string;
  nom_list:string;
  vistas:any;
  loggeado:string;
  maestros = [];
  UsrDpto:string;
  constructor(private bdservice:BdserviceService, private router:Router) { }

  ngOnInit(): void {
    this.loggeado = this.bdservice.getSession();
    if(this.loggeado == ""){
      this.router.navigate(['/inicio']);
    }
    this.UsrDpto = this.bdservice.getUsrDpto();
    this.visualizacion();


  }

  asignacion(nombre:string, salon:string, horario:string){
    this.bdservice.getCarreraVista(this.clase).subscribe(data =>{
        if(data=="false"){
          alert("error al conseguir carrera");
        }else{
          this.nomclase = data[0];
          this.nomclase2 = this.nomclase.Carrera.toLowerCase();
          let num = this.nomclase2.length;

          this.nom_list = this.clase.substr(num,this.clase.length);

        this.bdservice.asignacion(this.clase,nombre,salon,horario,this.nom_list, this.nomclase.Carrera).subscribe(data =>{
        if(data=="false"){
          alert("error al asignar");
        }else{
          alert("Maestro asignado");
          this.asignar(nombre);
          this.cont = [];
          this.maestros = [];
          this.visualizacion();

        }
    });
        }
    });

  }

setClase(clase:string){
  this.clase=clase;
}
asignar(nombre:string){
  this.bdservice.setMaestro(nombre).subscribe(data=>{

});
}

ver(nom_tab:string){
  this.bdservice.VerVista2(nom_tab).subscribe(
    vista => {
      if(vista == "false"){
        alert("algo paso mal viendo la vista");

      }else{
        this.vistas = vista
      }
    });
}

borrarGrupo(grupo:string){

    let confirmar=confirm("¿Seguro que se quiere eliminar el grupo "+grupo+" ?");
    if (confirmar){
      //Aquí pones lo que quieras si da a Aceptar
    }



}
visualizacion(){
  this.bdservice.getVistas2().subscribe(data =>{
    this.grupos = data;
    for(const nom of this.grupos){
      this.bdservice.maestroAsignado(nom.Table_Name).subscribe(data =>{
        if(data == "false"){

        }else{
          this.maestros.push(data);
        }

    });
      this.bdservice.conteoAsignacion(nom.Table_Name).subscribe(num =>{
          if(num == "false"){
          }else{

              this.cont.push(num);
          }
      });

    }
  });
}

}
