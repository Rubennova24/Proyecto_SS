import { Component, OnInit } from '@angular/core';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css']
})
export class ExtraComponent implements OnInit {
  carrerasyMaterias = [];
  gen=false;
  gen2=false;
  gen3=false;
  carrselectv:string;
  carreras: any;
  materias:any;
    materiaselectv:string;
  matselect:string;
  carreras_nom:any;
  dptos=[];
  constructor(private bdService:BdserviceService) { }

  ngOnInit(): void {
    this.bdService.getCarreras().subscribe(data=>{
      this.carreras=data;
    });
    this.materiaselectv="Selecciona una Materia";

    this.bdService.getMateriasC3().subscribe(data=>{
      this.materias=data;
    });
    this.matselect="Selecciona una Materia";
  }

  generar(){
    this.gen=true;
    this.bdService.getCarrerasyMaterias().subscribe(data =>{
      this.carrerasyMaterias = data[0];
      this.carrerasyMaterias[this.carrerasyMaterias.length-1].Nombre="Total";

    });
  }
  esconder(){
    this.gen=false;
  }
  generar2(carrera:string){
    if(carrera=="Selecciona una Carrera"){
      this.gen2=false;
    }else{
      this.gen2=true;
      this.bdService.getMateriasDpto(carrera).subscribe(data=>{
        this.dptos = data[0];

      });
    }
  }
  esconder2(){
    this.gen2=false;
  }
  generar3(nom_mat:string){
    this.gen3=true;
    this.bdService.getMateriasyCarreras(nom_mat).subscribe(data =>{
      this.carreras_nom = data[0];

    });
  }
  esconder3(){
    this.gen3=false;
  }

}
