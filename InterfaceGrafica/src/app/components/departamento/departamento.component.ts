import { BdserviceService } from './../../services/bdservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  carreras:any;
  deptos: any;
  materias:any;
  carrselectv:string;
  dptoselectv:string;
  materiaselectv:string;
  completo=false;
  constructor(private bdserviceService:BdserviceService,private router:Router) { }

  ngOnInit(): void {
    this.bdserviceService.getCarreras().subscribe(data=>{
      this.carreras=data;
    });
    this.materiaselectv="Selecciona una Materia";
  }
  SeleccionoCarr(carr: string){
    this.materiaselectv="Selecciona una Materia";
    this.bdserviceService.getDpto(carr).subscribe(data=>{
      this.deptos=data;
      this.carrselectv=carr;
    })
  }
  SeleccionoDpto(dpto: string){
    this.dptoselectv=dpto;
    this.materiaselectv="Selecciona una Materia";
    this.bdserviceService.getMateria(this.carrselectv,dpto).subscribe(data=>{
      this.materias=data;
    })
  }
  enviar(carrera:string,departamento:string,materia:string){
    if(carrera=="Selecciona una Carrera"||departamento=="Selecciona un Departamento"||materia=="Selecciona una Materia"){
      this.completo=true;
    }else{
      this.completo=false;
      this.bdserviceService.setSeleccionados(carrera,departamento,materia);
      this.router.navigate(['/', 'lista']);
    }
  }

}
