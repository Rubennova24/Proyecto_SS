import { BdserviceService } from './../../../services/bdservice.service';
import { Component, OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private bdservice:BdserviceService, private router:Router) { }
  materiacard:string = "";
  carreracard:string;
  vistas=[];
  carreras:any;
  texto="";
  tabla:boolean;
  upload=false;
  uploadedFiles: Array<File>;
  path:any;
  path2:string;
  inscripcionposible:boolean;
  fechainicio:string;
  fechafinal:string;
  compatibilidades:any;
  nomcompatibilidades=[];
  carrerascompats=[];
  bandvista:boolean=false;
  vistas2=[];
  nomcarrcompats=[];
  nomcarrsincompats=[];
  ngOnInit(): void {
    this.materiacard=this.bdservice.getselecMateria();
    if(this.materiacard == undefined){
      this.router.navigate(['/departamento']);
    }
    this.carreracard=this.bdservice.getselecCarrera();
    this.inscripcionposible=this.bdservice.esposibleinscribir;
    this.fechainicio=this.bdservice.getFechaInicio();
    this.fechafinal=this.bdservice.getFechaFinal();
    this.bdservice.getlista(this.materiacard).subscribe(data=>{
      if(Object.keys(data).length != 0){
        if(data == "false"){
          this.texto="No se han inscrito alumnos";
          this.tabla=false;
        }else{
          this.tabla=true;
          this.creacionVista();
        }
      }else{
          this.texto="No se han inscrito alumnos";
          this.tabla=false;
      }

    });


  }

  creacionVista(){
    //checar compatibilidad
    let indicecompat=0;
    let band=false;
    this.bdservice.obtenerCompatibilidad(this.materiacard).subscribe(data1=>{
      if(Object.keys(data1).length != 0){
        if(data1=="false"){
          alert('Algo salio mal compat');
        }else{
          this.compatibilidades=data1;
          let concat;
          for(let array1 of this.compatibilidades){
            concat=array1.Indice+array1.Materia;
            this.nomcompatibilidades.push(concat);
          }
          for(let array1 of this.compatibilidades){
            for(let carr in array1){
              if(carr != "Dpto" && carr != "Indice" && carr != "Materia"){
                this.nomcarrcompats.push(array1[carr]);
              }
            }
          }
          for(let array1 of this.compatibilidades){
            for(let carr in array1){
              if(carr != "Dpto" && carr != "Indice" && carr != "Materia"){
                if(this.carreracard==array1[carr]){
                  this.bandvista=true;
                  band=true;
                  break;
                }
              }
            }
            if(band){
              break;
            }else{
              indicecompat++;
            }
          }
          if(band){//si esta
            let nomvistacompat=this.compatibilidades[indicecompat].Indice+this.compatibilidades[indicecompat].Materia;
            let array1=this.compatibilidades[indicecompat]
            for(let carr in array1){
              if(carr != "Dpto" && carr != "Indice" && carr != "Materia"){
                this.carrerascompats.push(array1[carr]);
              }
            }
            this.bdservice.vistacompatibilidad(this.materiacard,nomvistacompat,this.carrerascompats).subscribe(data=>{
              if(data=="false"){
                alert('No pudimos crear la vista compat');
              }else{
                for(let nomvista of this.nomcompatibilidades){
                  this.bdservice.VerVista2(nomvista).subscribe(data2=>{
                    let prueba = new Date(data2[0].FechaInicio);
                    data2[0].FechaInicio = prueba.getDate()+'/'+(prueba.getMonth()+1)+'/'+prueba.getFullYear();
                    this.vistas2.push(data2);
                  });
                }
                console.log(this.vistas2);
              }
            });
          }else{//si hay compatibilidades pero no esta en la compatibilidad
            this.bdservice.getcarrsincompats(this.nomcarrcompats,this.materiacard).subscribe(datos=>{
              let carrsincompat:any=datos;
              
              if(datos=="false"){
                alert('Paso algo mal trayendo carreras sin compats');
              }else{
                for(let carrs of carrsincompat){
                  this.nomcarrsincompats.push(carrs.Carrera);
                }
                
                for( const Carr of this.nomcarrsincompats){
                  this.bdservice.CrearVista(this.materiacard, Carr).subscribe(
                    datos => {
        
                      if(datos=="false"){
                        //alert("algo salio mal en la creacion de vista");
                      }else{
                       // for(const Carr2 of this.carreras){
                        this.bdservice.VerVista(this.materiacard, Carr).subscribe(
                          vista => {
                            if(vista == "false"){
                             // alert("algo paso mal viendo la vista");
        
                            }else{
                              let prueba = new Date(vista[0].FechaInicio);
                              vista[0].FechaInicio = prueba.getDate()+'/'+(prueba.getMonth()+1)+'/'+prueba.getFullYear();
                              this.vistas.push(vista);
        
                            }
        
                          });
                       // }
                      }
                    }
                    );
                }
              }
            });
          }

        }
      }else{//Vista sin compatibilidad
        this.bdservice.VerCarreraLista(this.materiacard).subscribe(
          data => {
    
            this.carreras = data;
            for( const Carr of this.carreras){
              this.bdservice.CrearVista(this.materiacard, Carr.Carrera).subscribe(
                datos => {
    
                  if(datos=="false"){
                    //alert("algo salio mal en la creacion de vista");
                  }else{
                   // for(const Carr2 of this.carreras){
                    this.bdservice.VerVista(this.materiacard, Carr.Carrera).subscribe(
                      vista => {
                        if(vista == "false"){
                         // alert("algo paso mal viendo la vista");
    
                        }else{
                          let prueba = new Date(vista[0].FechaInicio);
                          vista[0].FechaInicio = prueba.getDate()+'/'+(prueba.getMonth()+1)+'/'+prueba.getFullYear();
                          this.vistas.push(vista);
    
                        }
    
                      });
                   // }
                  }
                }
                );
            }
          }
          );
      }
        

    });

    
  }
  inscripcion(id:string,nombre:string){
    let Dpto = this.bdservice.getSelectDpto();
      if(this.tabla){
        //se inscribe en la lista
        this.bdservice.inscribirlista(id,nombre,this.carreracard,this.materiacard, this.path.path, Dpto).subscribe(data=>{
          if(data=="false"){
            alert('No se pudo inscribir o id ya registrado, intenta nuevamente.');
          }else{
            alert("inscrito correctamente");
            this.vistas = [];
            this.vistas2 = [];
            //this.creacionVista();
            this.router.navigateByUrl('/inicio', {skipLocationChange: true}).then(()=>
            this.router.navigate(["/lista"]));
          }
        });
      }else{
        //se crea la lista y se inscribe
        this.bdservice.createlista(this.materiacard).subscribe(data=>{
          if(data=="false"){
            //alert('Algo paso mal tabla');
          }else{
            //alert("tabla creada correctamente");


          }
        });
        this.bdservice.inscribirlista(id,nombre,this.carreracard,this.materiacard, this.path.path, Dpto).subscribe(data=>{
          if(data=="false"){
            alert('No se pudo inscribir o id ya registrado, intenta nuevamente.');
          }else{
            alert("inscrito correctamente");
            this.vistas=[];
            this.vistas2 = [];
            this.tabla=true;
            //this.creacionVista();
            this.router.navigateByUrl('/inicio', {skipLocationChange: true}).then(()=>
            this.router.navigate(["/lista"]));
          }
        });
      }


  }
  onUpload(id:string,nombre:string){
    if(id != "" && nombre != ""){
      let formData = new FormData();
      formData.append("uploads[]",this.uploadedFiles[0], this.uploadedFiles[0].name);
    let nombre_arch = this.uploadedFiles[0].name

    this.bdservice.uploadFile(formData, nombre_arch).subscribe( res =>{
      this.upload=true;
      this.path = res
      this.path.path = this.path.path.replace("public\\subidas\\","");


    });
    }else{
      alert("Favor de completar todos los datos.");
    }


  }
  onFileChange(e){

    this.uploadedFiles = e.target.files;


  }

}
