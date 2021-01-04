import { BdserviceService } from 'src/app/services/bdservice.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app-redes';
  subscription:Subscription;
  refresh=false;
  views = [];
  constructor(private bdservice:BdserviceService){  }
  ngOnInit(){


    this.bdservice.getFinsciripciones().subscribe(data=>{

      var hoy=new Date();
      var cierre=new Date(Date.parse(data[0].CierreTotal));
      var inicio=new Date(Date.parse(data[0].Inicio));
      var final=new Date(Date.parse(data[0].Final));
      let iniciocompleto=inicio.getDate()+"/"+(inicio.getMonth()+1)+"/"+inicio.getFullYear();
      let finalcompleto=final.getDate()+"/"+(final.getMonth()+1)+"/"+final.getFullYear();
      let hoycompleto=hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear();
      let cierrecompleto=cierre.getDate()+"/"+(cierre.getMonth()+1)+"/"+cierre.getFullYear();

      if(hoy>=cierre){
        this.borrartodo();
        this.asignarNuevaFecha();
      }
      if(inicio<=hoy && final>=hoy){
        this.bdservice.setPosibleInscribir(true,iniciocompleto,finalcompleto);
      }else{
        this.bdservice.setPosibleInscribir(false,iniciocompleto,finalcompleto);
      }
    });

  }
  borrartodo(){
    this.bdservice.getVistas2().subscribe(data1 =>{
      let allviews:any = data1;

      for(let vista of allviews){
          this.views.push(vista.Table_Name);

      }
      if(this.views.length !=0){
        this.bdservice.guardarReporteExcel(this.views).subscribe(datos =>{
          if(datos=="true"){
            this.bdservice.totaltablas().subscribe(data=>{
              this.bdservice.borrar(data);
            });
          }
      });
      }




    });

  }
  asignarNuevaFecha(){
    this.bdservice.setNuevaFecha(true);

  }

}
