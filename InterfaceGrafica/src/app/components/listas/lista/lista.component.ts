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
  texto="";
  tabla:boolean;
  ngOnInit(): void {
    this.materiacard=this.bdservice.getselecMateria();
    this.carreracard=this.bdservice.getselecCarrera();
    this.bdservice.getlista().subscribe(data=>{
      if(data=="false"){
        this.texto="No se han inscrito alumnos";
        this.tabla=false;
      }else{
        this.tabla=true;
        alert('ya hay alumnos')
        //data ya tiene la lista de los alumnos inscritos pero son de todas las carreras, de aqui lo mandas a crear o ver las vistas
        //acordarse de si ya exite volver a consultar la vista, sino es crearla
      }
    });
  }
  inscripcion(id:string,nombre:string){
    if(this.tabla){
      //se inscribe en la lista
      this.bdservice.inscribirlista(id,nombre,this.carreracard,this.materiacard).subscribe(data=>{
        if(data=="false"){
          alert('Algo paso mal');
        }else{
          alert("inscrito correctamente");
          
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
          alert('Algo paso mal');
        }else{
          alert("inscrito correctamente");
        }
      });
    }
  }

}
