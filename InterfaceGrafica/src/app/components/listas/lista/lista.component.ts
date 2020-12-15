import { BdserviceService } from './../../../services/bdservice.service';
import { Component, OnInit } from '@angular/core';

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
  ngOnInit(): void {
    this.materiacard=this.bdservice.getselecMateria();
    this.carreracard=this.bdservice.getselecCarrera();
    this.bdservice.getlista(this.materiacard).subscribe(data=>{
      if(data=="false"){
        this.texto="No se han inscrito alumnos";
        this.tabla=false;
      }else{
        this.tabla=true;
        this.creacionVista();
        //data ya tiene la lista de los alumnos inscritos pero son de todas las carreras, de aqui lo mandas a crear o ver las vistas
        //acordarse de si ya exite volver a consultar la vista, sino es crearla
      }
    });
  }

  creacionVista(){
    this.bdservice.VerCarreraLista(this.materiacard).subscribe(
      data => {
        console.log(data);
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
                      
                      console.log(this.vistas);
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
    if(this.tabla){
      //se inscribe en la lista
      this.bdservice.inscribirlista(id,nombre,this.carreracard,this.materiacard).subscribe(data=>{
        if(data=="false"){
          alert('Algo paso mal en inscribir');
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
      this.bdservice.inscribirlista(id,nombre,this.carreracard,this.materiacard).subscribe(data=>{
        if(data=="false"){
          alert('Algo paso mal xdxd');
        }else{
          alert("inscrito correctamente");
          this.vistas=[];
          this.tabla=true;
          this.creacionVista();
        }
      });
    }
  }

}
