import { BdserviceService } from './../../../services/bdservice.service';
import { Component, OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private bdservice:BdserviceService) { }
  materiacard:string;
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
  ngOnInit(): void {
    this.materiacard=this.bdservice.getselecMateria();
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
    this.bdservice.VerCarreraLista(this.materiacard).subscribe(
      data => {

        this.carreras = data;
        for( const Carr of this.carreras){
          this.bdservice.CrearVista(this.materiacard, Carr.Carrera).subscribe(
            datos => {

              if(datos=="false"){
                alert("algo salio mal en la creacion de vista");
              }else{
               // for(const Carr2 of this.carreras){
                this.bdservice.VerVista(this.materiacard, Carr.Carrera).subscribe(
                  vista => {
                    if(vista == "false"){
                      alert("algo paso mal viendo la vista");

                    }else{
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
            this.creacionVista();
          }
        });
      }else{
        //se crea la lista y se inscribe
        this.bdservice.createlista(this.materiacard).subscribe(data=>{
          if(data=="false"){
            alert('Algo paso mal tabla');
          }else{
            alert("tabla creada correctamente");


          }
        });
        this.bdservice.inscribirlista(id,nombre,this.carreracard,this.materiacard, this.path.path, Dpto).subscribe(data=>{
          if(data=="false"){
            alert('No se pudo inscribir o id ya registrado, intenta nuevamente.');
          }else{
            alert("inscrito correctamente");
            this.vistas=[];
            this.tabla=true;
            this.creacionVista();
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
