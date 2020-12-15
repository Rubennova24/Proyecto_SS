import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {
  carrera:string;
  departamento:string;
  materia:string;

  constructor(private httpClient: HttpClient) { }
  getCarreras() {
    return this.httpClient.get('http://localhost:3000/' + 'carreras');
  }
  getDpto(clave: string){
    const body = new HttpParams()
    .set('IdCarrera', clave);
    return this.httpClient.post('http://localhost:3000/' + 'dpto', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getMateria(carr: string,dpto:string){
    const body = new HttpParams()
    .set('IdCarrera', carr)
    .set('IdDpto', dpto);
    return this.httpClient.post('http://localhost:3000/' + 'materia', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getlista(materia: string){
    let mat =  materia.replace(/ /g,"");
  
    const body = new HttpParams()
    .set('Materia', mat);
    return this.httpClient.post('http://localhost:3000/' + 'lista', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  createlista(materia:string){
    let mat =  materia.replace(/ /g,"");
    const body = new HttpParams()
    .set('Materia', mat);
    return this.httpClient.post('http://localhost:3000/' + 'createlista', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  inscribirlista(id:string,nombre:string,carrera:string,materia:string){
    let mat = materia.replace(/ /g,"");
    const body = new HttpParams()
    .set('Id', id)
    .set('Nombre', nombre)
    .set('Carrera', carrera)
    .set('Materia', mat);
    return this.httpClient.post('http://localhost:3000/' + 'inscribirlista', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  setSeleccionados(carr:string,dpto:string,mat:string){
    this.carrera=carr;
    this.departamento=dpto;
    this.materia=mat;
  }
  getselecMateria(){
    return this.materia;
  }
  getselecCarrera(){
    return this.carrera;
  }

  VerCarreraLista(Materia: string){
    let mat = Materia.replace(/ /g,"");
    const body = new HttpParams()
    .set('Materia', mat);
    return this.httpClient.post('http://localhost:3000/' + 'VerCarrerasLista', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  CrearVista(Materia: string, Carrera: string){
    let mat = Materia.replace(/ /g,"");
    const body = new HttpParams()
    .set('Materia', mat)
    .set('Carrera', Carrera);
    return this.httpClient.post('http://localhost:3000/' + 'CrearVista', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  VerVista(Materia: string, Carrera: string){
    let mat = Materia.replace(/ /g,"");
    const body = new HttpParams()
    .set('Materia', mat)
    .set('Carrera', Carrera);
    return this.httpClient.post('http://localhost:3000/' + 'VerVistas', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}
