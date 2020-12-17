import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from './../../services/bdservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  Tipo:string;
  pass: string;
  usuario: string;
  logeado=false;
  sesion = "incorrecto";
  completo:boolean;

  constructor(private router: Router,private bdserviceService:BdserviceService) {

   }

  ngOnInit(): void {
    this.completo=true;
  }

  ingresar(){
    this.bdserviceService.getUsr(this.usuario,this.pass).subscribe(data =>{
      if(Object.keys(data).length == 0){
        this.bdserviceService.getUsr2(this.usuario,this.pass).subscribe(data2 =>{
        if(Object.keys(data2).length == 0){

          this.completo=false;
        }else{
          this.logeado = true;
          this.Tipo="Centro";
          this.sesion = "correcto";
          this.completo=true;
          this.bdserviceService.setSession(this.usuario);
        }
        //this.router.navigate(['/asignacion']);
        });
      }else{
        this.logeado=true;
        this.Tipo="Dpto";
        this.sesion = "correcto";
        this.completo=true;
        this.bdserviceService.setSession(this.usuario);
      }
    });

  }

  limpiar(){
    this.pass = ""
    this.usuario = ""
  }
  cerrarSesion(){
    this.limpiar()
    this.Tipo="Usr";
    this.sesion = "incorrecto";
    this.logeado = false;
    this.router.navigate(['/inicio']);

  }



}
