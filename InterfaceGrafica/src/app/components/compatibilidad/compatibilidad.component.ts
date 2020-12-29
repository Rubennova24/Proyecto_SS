
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
  loggeado:string ="";
  constructor(private bdservice:BdserviceService, private router:Router) { }

  ngOnInit(): void {
    this.loggeado = this.bdservice.getSession();
    if(this.loggeado == ""){
      this.router.navigate(['/inicio']);
    }
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
    this.agregarcompats = [];
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
  agregarcompat(carrera:string){
    let codCarr = Array();
    let band:boolean = false;
    console.log(this.nomcompatmat);

    for(let col of this.nomcompatmat){
      for(let item in col){
      if(item != "Dpto" && item != "Indice" && item != "Materia"){
        codCarr.push(col[item]);

      }
       if(carrera == col[item]){
         alert("Esta carrera ya esta en la lista de compatibilidad.");
         band = true;
         break;
       }
      }
     }
     if(band == false){
      let index = codCarr.indexOf("");
     if(index != -1){
       codCarr[index]=carrera
       if(codCarr.length != 8){
        while(codCarr.length!=8){
          codCarr.push('');
        }
       }
       this.bdservice.updatecompatibilidad(this.nomcompatmat[0].Dpto,this.nomcompatmat[0].Indice,this.nomcompatmat[0].Materia, codCarr).subscribe(data =>{
        if(data=="false"){
          alert('No pudimos');
        }else{
          alert('Compatibilidad Modificada');
          this.router.navigateByUrl('/inicio', {skipLocationChange: true}).then(()=>
          this.router.navigate(["/compatibilidad"]));
        }
       });
     }

     }


  }
  eliminarcompat(indice:string){
    let confirmar=confirm("¿Seguro que se quiere eliminar el grupo de compatibilidad "+indice+"?");
    if (confirmar){
      //Aquí pones lo que quieras si da a Aceptar
      this.bdservice.eliminarcompatibilidad(indice).subscribe(data=>{
        if(data=="false"){
          alert('No pudimos');
        }else{
          alert('Compatibilidad Eliminada');
          this.router.navigateByUrl('/inicio', {skipLocationChange: true}).then(()=>
          this.router.navigate(["/compatibilidad"]));
        }
      });

    }


  }

}
