import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';
import { saveAs } from "file-saver";

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
  asigncarrcompats = [];
  departamento:any;
  maestros_dpto = [];
  concatGrupoycompats = [];
  carr = [];
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

    })
  }
  asignacion(nombre:string, salon:string, horario:string, fechaInicio:string){
    if(nombre == "" || salon == "" || horario == "" || fechaInicio == ""){
      alert("completa los datos.");
    }else{
      this.bdservice.getCompatibilidades(this.UsrDpto).subscribe(data =>{
        let compats:any = data;
        if(data == "false"){
          alert("error al conseguir UsrDpto");

        }else{
          for(let concat of compats){
            let string:string = concat.Indice+concat.Materia;
            this.concatGrupoycompats.push(string.toLowerCase());
          }
          let i=this.concatGrupoycompats.indexOf(this.clase);
          if(i != -1){
            let array1 = compats[i]
            for(let carr in array1){
              if(carr != "Dpto" && carr != "Indice" && carr != "Materia"){
                this.asigncarrcompats.push(array1[carr]);

              }
            }
            this.bdservice.updateAsignacioncompats(array1.Materia, nombre, salon, horario, fechaInicio, this.asigncarrcompats).subscribe(data=>{
              if(data == "false"){
                alert("error al update en compats");

              }else{

              }
            });
            this.bdservice.asignarMaestroCompat(this.clase,nombre,salon,horario,array1.Materia, "", fechaInicio).subscribe(data =>{
              console.log(data);

              if(data=="false"){
                this.asignar(nombre);
                this.cont = [];
                this.maestros = [];
                this.grupos2=[]
                this.router.navigateByUrl('/inicio', {skipLocationChange: true}).then(()=>
            this.router.navigate(["/asignacion"]));
              }else{
                alert("Maestro asignado");
                this.asignar(nombre);
                this.cont = [];
                this.maestros = [];
                this.grupos2=[]
                this.router.navigateByUrl('/inicio', {skipLocationChange: true}).then(()=>
            this.router.navigate(["/asignacion"]));

              }
          });
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
        let carrerasBorrar:any = data;
        if(data=="false"){
          //alert("error al conseguir carrera");
        }else{
          for(let carreras of carrerasBorrar){
            this.bdservice.getTablafromView(grupo).subscribe(data=>{
              console.log(data);
              if(data=="false"){

              }else{
                let str = data[0].View_definition;
                str = str.split(',');
                str = str[1].replace("`cursosespeciales`.`", '');
                str = str.replace("`.`Nombre` AS `Nombre`",'');
                this.bdservice.dropTableInfo(str,carreras.Carrera).subscribe(data3 =>{
                  console.log(data3);
                  if(data == "false"){
                    //alert("Error al borrar grupo "+grupo);
                  }else{

                  }
                });
              }
                });
          }

         this.bdservice.dropView(grupo).subscribe(data2 =>{
          console.log(data2);
            if(data2 == "false"){
              //alert("Error al borrar grupo "+grupo);
            }else{
              this.router.navigateByUrl('/inicio', {skipLocationChange: true}).then(()=>
              this.router.navigate(["/asignacion"]));

            }




    });
    this.cont = [];
    this.maestros = [];
    this.grupos2=[];
    this.router.navigateByUrl('/inicio', {skipLocationChange: true}).then(()=>
  this.router.navigate(["/asignacion"]));
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
guardarexcel(Tabla:string){
  let confirmar=confirm("¿Seguro que se quiere exportar el grupo "+Tabla+" a excel ?");
  if (confirmar){
    this.bdservice.guardarexcel(Tabla).subscribe(data =>{
      if(data=="false"){
        alert("No se pudo exportar el archivo.");
      }else if(data=="true"){

        this.descargar(Tabla);
      }
    });
  }

}

descargar(Tabla:string){
  this.bdservice.descargarexcel(Tabla).subscribe(data2 =>{
    saveAs(data2, Tabla);
  });
}
}
