import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {
  grupos2=[];
  grupos:any;
  allgrupos:any;
  cont = [];
  tabla:boolean;
  clase:string;
  nomclase:any;
  nomclase2:string;
  nomCarrera:string;
  nom_list:string;
  nom_list2:string;
  vistas:any;
  loggeado:string;
  maestros = [];
  UsrDpto:string;
  existengrupos=false;

  departamento:any;
  maestros_dpto = [];

  constructor(private bdservice:BdserviceService, private router:Router) { }

  ngOnInit(): void {
    this.loggeado = this.bdservice.getSession();
    if(this.loggeado == ""){
      this.router.navigate(['/inicio']);
    }
    this.UsrDpto = this.bdservice.getUsrDpto();
    this.visualizacion();
    this.departamento= this.bdservice.getUsrDpto(); //Centro
    this.obtener_maestros();
  }
  obtener_maestros(){
    this.bdservice.getMaestros(this.departamento).subscribe(data => {
      for (var i in data){
        this.maestros_dpto.push(data[i].Nombre);
      }
      //this.maestros_dpto.push(data);
      console.log(this.maestros_dpto);
    })
  }

  buscar(e){
    console.log(e);  
  }
  
  asignacion(nombre:string, salon:string, horario:string, fechaInicio:string){
    if(nombre == "" || salon == "" || horario == "" || fechaInicio == ""){
      alert("completa los datos.");
    }else{
      this.bdservice.getCarreraVista(this.clase).subscribe(data =>{
        if(data=="false"){
          //alert("error al conseguir carrera");
        }else{
          this.nomclase = data[0];
          this.nomclase2 = this.nomclase.Carrera.toLowerCase();
          let num = this.nomclase2.length;

          this.nom_list = this.clase.substr(num,this.clase.length);

        this.bdservice.asignacion(this.clase,nombre,salon,horario,this.nom_list, this.nomclase.Carrera, fechaInicio).subscribe(data =>{
        if(data=="false"){
          this.asignar(nombre);
          this.cont = [];
          this.maestros = [];
          this.grupos2=[]
          this.visualizacion()
        }else{
          alert("Maestro asignado");
          this.asignar(nombre);
          this.cont = [];
          this.maestros = [];
          this.grupos2=[]
          this.visualizacion();

        }
    });
        }
    });
    }
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
        //alert("algo paso mal viendo la vista");

      }else{
        this.vistas = vista
      }
    });
}

borrarGrupo(grupo:string){


    let confirmar=confirm("¿Seguro que se quiere eliminar el grupo "+grupo+" ?");
    if (confirmar){
      //Aquí pones lo que quieras si da a Aceptar
      this.bdservice.getCarreraVista(grupo).subscribe(data =>{
        if(data=="false"){
          //alert("error al conseguir carrera");
        }else{
          this.nomCarrera = data[0].Carrera;
          this.nomclase2 = this.nomCarrera
          let num = this.nomclase2.length;
          this.nom_list2 = grupo.substr(num,grupo.length);
          this.bdservice.dropView(grupo).subscribe(data2 =>{
            console.log(data2);
            if(data == "false"){
              //alert("Error al borrar grupo "+grupo);
            }else{
            }
          });
          this.bdservice.dropTableInfo(this.nom_list2,this.nomCarrera).subscribe(data3 =>{
            console.log(data3);
            if(data == "false"){
              //alert("Error al borrar grupo "+grupo);
            }else{

            }
          });
          this.cont = [];
              this.maestros = [];
              this.grupos2=[];
              this.visualizacion();
        }
    });

    }



}
visualizacion(){
  //Aqui va ir un if para si es jefe dpto o si es decano
  this.existengrupos=false;
  let tipo=this.bdservice.getTipo();
  if(tipo=="Dpto"){
    this.bdservice.getVistas2().subscribe(data=>{
      if(Object.keys(data).length != 0){
      this.allgrupos=data;
      for(const nom of this.allgrupos){
        this.bdservice.checkDpto(nom.Table_Name,this.UsrDpto).subscribe(data2=>{
          if(Object.keys(data2).length != 0){
            this.existengrupos=true;
            this.grupos2.push(nom.Table_Name);
            this.bdservice.maestroAsignado(nom.Table_Name).subscribe(data3 =>{
              if(data3 == "false"){
              }else{
                let prueba = new Date(data3[0].FechaInicio);
                data3[0].FechaInicio = prueba.getDate()+'/'+(prueba.getMonth()+1)+'/'+prueba.getFullYear();
                this.maestros.push(data3);
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
    }//end if de si hay grupos
    });
  }else if(tipo=="Centro"){
  this.bdservice.getVistas2().subscribe(datacentro =>{
    if(Object.keys(datacentro).length != 0){
      this.allgrupos = datacentro;
      for(const nom of this.allgrupos){
        this.grupos2.push(nom.Table_Name);
        this.existengrupos=true;
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
    }
  });
  }//end else if
}

}
