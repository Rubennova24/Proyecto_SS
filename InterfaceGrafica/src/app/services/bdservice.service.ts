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
  getlista(){
    const body = new HttpParams()
    .set('Materia', this.materia.trim());
    return this.httpClient.post('http://localhost:3000/' + 'lista', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  createlista(materia:string){
    const body = new HttpParams()
    .set('Materia', materia.trim());
    return this.httpClient.post('http://localhost:3000/' + 'createlista', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  inscribirlista(id:string,nombre:string,carrera:string,materia:string){
    const body = new HttpParams()
    .set('Id', id)
    .set('Nombre', nombre)
    .set('Carrera', carrera)
    .set('Materia', materia.trim());
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
}
