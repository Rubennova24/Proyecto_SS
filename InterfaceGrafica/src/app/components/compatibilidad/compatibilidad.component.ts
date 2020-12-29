
import { Router } from '@angular/router';

import { BdserviceService } from './../../services/bdservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compatibilidad',
  templateUrl: './compatibilidad.component.html',
  styleUrls: ['./compatibilidad.component.css']
})
export class CompatibilidadComponent implements OnInit {
  usrdpto:string;
  materias:any;
  materiaselectv:string;
  carreras:any;
  carreras2:any;
  carrerascompat=[];
  compatibilidades:any;
  compatmat:any;
  nomcompatmat:any;
  agregarcompats=[];
  constructor(private bdservice:BdserviceService, private router:Router) { }

  ngOnInit(): void {
    this.usrdpto=this.bdservice.getUsrDpto();
    this.visualizacion();

  }
  visualizacion(){
    this.bdservice.getMateriasrepetidas(this.usrdpto).subscribe(data=>{
      this.materias=data;
    });
    this.bdservice.getCompatibilidades(this.usrdpto).subscribe(data=>{
      this.compatibilidades=data;
    });
  }
  Seleccionomat(indice:string){
    this.materiaselectv=indice;
    this.bdservice.getCarrerasrepetidas(indice).subscribe(data=>{
      this.carreras=data;
    });
  }
  Seleccionocompat(matselect:any){
    this.carrerascompat=[];
    this.compatmat=matselect;
    
    this.bdservice.getCompatibilidad(this.compatmat,this.usrdpto).subscribe(data=>{
      this.bdservice.getCarrerasrepetidas(data[0].Materia).subscribe(data=>{
        this.carreras2=data;
      });
      this.nomcompatmat=data;
      if(data[0].col1!=''){
        this.bdservice.getCarrera(data[0].col1).subscribe(data2=>{
          if(data2!="false"){
            this.carrerascompat.push(data2);
            }
        });
      }
      if(data[0].col2!=''){
        this.bdservice.getCarrera(data[0].col2).subscribe(data2=>{
          if(data2!="false"){
            this.carrerascompat.push(data2);
            }
        });
      }
      
      if(data[0].col3!=''){
        this.bdservice.getCarrera(data[0].col3).subscribe(data2=>{
          if(data2!="false"){
            this.carrerascompat.push(data2);
            }
        });
      }
      
      if(data[0].col4!=''){
        this.bdservice.getCarrera(data[0].col4).subscribe(data2=>{
          if(data2!="false"){
            this.carrerascompat.push(data2);
            }
        });
      }
      if(data[0].col5!=''){
        this.bdservice.getCarrera(data[0].col5).subscribe(data2=>{
          if(data2!="false"){
            this.carrerascompat.push(data2);
            }
        });
      }
      if(data[0].col6!=''){
        this.bdservice.getCarrera(data[0].col6).subscribe(data2=>{
          if(data2!="false"){
            this.carrerascompat.push(data2);
            }
        });
      }
      if(data[0].col7!=''){
        this.bdservice.getCarrera(data[0].col7).subscribe(data2=>{
          if(data2!="false"){
            this.carrerascompat.push(data2);
            }
        });
      }
      if(data[0].col8!=''){
        this.bdservice.getCarrera(data[0].col8).subscribe(data2=>{
          if(data2!="false"){
            this.carrerascompat.push(data2);
            }
        });
      }
     
    });
  }
  checkboxes(event:boolean,value:string){
    if(event){
      this.agregarcompats.push(value);
    }else{
      let i=this.agregarcompats.indexOf(value);
      this.agregarcompats.splice(i,1);
    }
    
  }
  nuevacompat(){
    if(this.agregarcompats.length<=1){
      alert('Para crear una nueva compatibilidad necesitamos al menos 2 carreras');
    }else if(this.agregarcompats.length!=8){
      while(this.agregarcompats.length!=8){
        this.agregarcompats.push('');
      }
      this.bdservice.nuevacompatibilidad(this.materiaselectv,this.usrdpto,this.agregarcompats).subscribe(data=>{
        if(data=="false"){
          alert('No pudimos');
        }else{
          alert('Compatibilidad Agregada');
          this.router.navigateByUrl('/inicio', {skipLocationChange: true}).then(()=>
          this.router.navigate(["/compatibilidad"]));
        }
      });
    }else{
      this.bdservice.nuevacompatibilidad(this.materiaselectv,this.usrdpto,this.agregarcompats).subscribe(data=>{
        if(data=="false"){
          alert('No pudimos');
        }else{
          alert('Compatibilidad Agregada');
        }
      });
    }
  }

}
