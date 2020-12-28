import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent implements OnInit {
  confirmado = false;
  Asignador:string;
  loggeado:string;
  constructor(private bdService:BdserviceService, private router: Router) { }

  ngOnInit(): void {
    this.loggeado = this.bdService.getSession();
    if(this.loggeado == ""){
      this.router.navigate(['/inicio']);
    }
    this.Asignador = this.bdService.getSession();
  }

  checkFecha(nuevafecha:string, fechacierre:string, fechacierretotal:string){
    if(nuevafecha !="" && fechacierre !="" && fechacierretotal !=""){
      if(fechacierre > nuevafecha && fechacierretotal > fechacierre){
        let confirmar=confirm("El nuevo periodo de inscripcion empezara "+nuevafecha+".\nEl cierre del periodo de inscripción sera "+fechacierre+". \nEl nuevo comienzo del ciclo sera "+fechacierretotal+".");
    if (confirmar){
      //Aquí pones lo que quieras si da a Aceptar
      this.bdService.updateNuevoCiclo(nuevafecha,fechacierre,fechacierretotal).subscribe(data =>{

      });
      this.confirmado=true;
        }
      }else{
        alert("La fecha del cierre del periodo de inscripciones no puede ser menor a la fecha del comienzo del nuevo periodo de inscripciones.");
      }

    }else{
      alert("Se tiene que llenar los campos correspondientes a las fechas de manera obligatoria.");
    }

  }

  regresar(){
    this.bdService.asignadospor(this.Asignador).subscribe(data =>{
        if(data == "false"){
          //alert("fallo en asignarpor");
        }else{
          this.bdService.setComponenteFecha(false);
          window.location.reload();

        }
    });

  }

}
