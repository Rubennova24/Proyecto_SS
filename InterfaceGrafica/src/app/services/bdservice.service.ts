import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {
  carrera:string;
  departamento:string;
  materia:string;
  jefeDpto:string = "";
  Dpto:string = "";
  tipo:string
  constructor(private httpClient: HttpClient) { }
  getSession(){
    return this.jefeDpto;
  }
  getUsrDpto(){
    return this.Dpto;
  }
  getTipo(){
    return this.tipo;
  }
  uploadFile(formData, nombre_arch:string){

    let urlApi = 'http:///localhost:3000/subirimagen';
    return this.httpClient.post(urlApi, formData);
  }
  getCarreras() {
    return this.httpClient.get('http://localhost:3000/' + 'carreras');
  }
  setSession(jefe:string, Dpto:string,tipo:string){
    this.jefeDpto= jefe;
    this.Dpto = Dpto;
    this.tipo=tipo;
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
  maestroAsignado(nom_tab: string){
    const body = new HttpParams()
    .set('nom_tab', nom_tab);
    return this.httpClient.post('http://localhost:3000/' + 'maestroAsignado', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  checkDpto(nom_tab: string,Dpto:string){
    const body = new HttpParams()
    .set('nom_tab', nom_tab)
    .set('Dpto', Dpto);
    return this.httpClient.post('http://localhost:3000/' + 'checkDpto', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  /*dropTableyView(Materia: string, Carrera: string){
    let mat = Materia.replace(/ /g,"");
    let anidado = Carrera+mat;
    const body = new HttpParams()
    .set('Nombre', anidado)
    .set('Materia', mat)
    .set('Carrera', Carrera);

    return this.httpClient.post('http://localhost:3000/' + 'CrearVista', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }*/

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
  inscribirlista(id:string,nombre:string,carrera:string,materia:string, imagen:string , Dpto:string){
    let mat = materia.replace(/ /g,"");
    const body = new HttpParams()
    .set('Id', id)
    .set('Nombre', nombre)
    .set('Carrera', carrera)
    .set('Materia', mat)
    .set('Imagen', imagen)
    .set('Dpto', Dpto);
    return this.httpClient.post('http://localhost:3000/' + 'inscribirlista', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  setMaestro(nom_maestro:string){
    const body = new HttpParams()
    .set('jefe', this.jefeDpto)
    .set('nombre_maestro', nom_maestro);
    return this.httpClient.post('http://localhost:3000/' + 'asignjefedpto', body.toString(),
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
  getSelectDpto(){
    return this.departamento;
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
    let anidado = Carrera+mat;
    const body = new HttpParams()
    .set('Nombre', anidado)
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
    let anidado = Carrera+mat;
    const body = new HttpParams()
    .set('Nombre', anidado);
    return this.httpClient.post('http://localhost:3000/' + 'VerVistas', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  VerVista2(Nombre: string){
    //let mat = Materia.replace(/ /g,"");
    const body = new HttpParams()
    .set('Nombre', Nombre);
    return this.httpClient.post('http://localhost:3000/' + 'VerVistas2', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getVistas2() {
    return this.httpClient.get('http://localhost:3000/' + 'asignacion');
  }

  conteoAsignacion(Nombre:string){
    const body = new HttpParams()
    .set('Nombre', Nombre);
    return this.httpClient.post('http://localhost:3000/' + 'conteo', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  asignacion(Clase:string, Nombre:string, Salon:string, Horario:string,NombreLista:string,Carrera:string){

    const body = new HttpParams()
    .set('Clase', Clase)
    .set('Nombre', Nombre)
    .set('Salon', Salon)
    .set('Horario', Horario)
    .set('NombreLista', NombreLista)
    .set('Carrera', Carrera);
    return this.httpClient.post('http://localhost:3000/' + 'asignarMaestro', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getCarreraVista(Nombre:string){
    const body = new HttpParams()
    .set('Nombre', Nombre);
    return this.httpClient.post('http://localhost:3000/' + 'getCarreraVista', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getUsr(usr: string, pass: string){
    const body = new HttpParams()
    .set('Usuario', usr)
    .set('Password', pass);
    return this.httpClient.post('http://localhost:3000/' + 'usr', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getUsr2(usr: string, pass: string){
    const body = new HttpParams()
    .set('Usuario', usr)
    .set('Password', pass);
    return this.httpClient.post('http://localhost:3000/' + 'usr2', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }


}
