import { Component, OnInit } from '@angular/core';
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
  constructor(private bdservice:BdserviceService) { }

  ngOnInit(): void {
    this.bdservice.getVistas2().subscribe(data =>{
      this.grupos = data;
      for(const nom of this.grupos){
        this.bdservice.conteoAsignacion(nom.Table_Name).subscribe(num =>{
            if(num == "false"){
            }else{

                this.cont.push(num);
            }
        });
      }
      //console.log(data);
    });


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
          alert("Maestro Asignado");
        }
    });
        }
    });
    
  }

setClase(clase:string){
  this.clase=clase;
}


}
