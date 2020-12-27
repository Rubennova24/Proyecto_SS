import { data } from 'jquery';
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
  tipo:string;
  fechainicio:string;
  fechafinal:string;
  esposibleinscribir:boolean;
  nuevafecha:boolean = false;
  componenteFecha:boolean = false;
  tables=['asignadospor','carrera','centro','departamento','dpto_ca','fecha_inscripciones','jefe_centro','jefe_dpto','maestros_asignados','materia'];
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
  setNuevaFecha(nuevafecha){
    this.nuevafecha = nuevafecha;

  }
  getnuevaFecha(){
    return this.nuevafecha;
  }
  setComponenteFecha(cfecha){
    this.componenteFecha = cfecha;

  }
  getComponenteFecha(){
    return this.componenteFecha;
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
  dropTableInfo( lista: string, nomCarrera:string){

    const body = new HttpParams()
    .set('Lista', lista)
    .set('nomCarrera', nomCarrera);
    return this.httpClient.post('http://localhost:3000/' + 'dropTableInfo', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  dropView(grupo: string){

    const body = new HttpParams()
    .set('Vista', grupo);
    return this.httpClient.post('http://localhost:3000/' + 'dropView', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  dropTable(grupo: string){
    const body = new HttpParams()
    .set('Tabla', grupo);
    return this.httpClient.post('http://localhost:3000/' + 'droptable', body.toString(),
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
  getJefes(){
    return this.httpClient.get('http://localhost:3000/' + 'jefes');
  }
  getDptosJefes(){
    return this.httpClient.get('http://localhost:3000/' + 'dptos_jefes');
  }
  getJefes_centro(){
    return this.httpClient.get('http://localhost:3000/' + 'jefes_centro');
  }
  getJefe(id: string){
    const body = new HttpParams()
    .set('Id', id);
    return this.httpClient.post('http://localhost:3000/' + 'jefe', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  registrar(id: string,nom: string,pass: string,dpto: string,jefe:string){
    const body = new HttpParams()
    .set('Id', id)
    .set('Nombre', nom)
    .set('Contrasena', pass)
    .set('JefeCentro', jefe)
    .set('Dpto', dpto);
    return this.httpClient.post('http://localhost:3000/' + 'registrar', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  editar(id: string, n_nom: string, n_pass: string, n_dpto: string, n_jefe:string){
    const body = new HttpParams()
    .set('Id', id)
    .set('Nombre', n_nom)
    .set('Contrasena', n_pass)
    .set('JefeCentro', n_jefe)
    .set('Dpto', n_dpto);
    return this.httpClient.post('http://localhost:3000/' + 'editar', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  eliminar(id: string){
    const body = new HttpParams()
    .set('Id', id);
    return this.httpClient.post('http://localhost:3000/' + 'eliminar', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getFinsciripciones() {
    return this.httpClient.get('http://localhost:3000/' + 'fechainscripcion');
  }
  setPosibleInscribir(inscribir:boolean,inicio:string,final:string){
    this.esposibleinscribir=inscribir;
    this.fechainicio=inicio;
    this.fechafinal=final
  }
  getFechaInicio(){
    return this.fechainicio;
  }
  getFechaFinal(){
    return this.fechafinal;
  }
  totaltablas(){
    return this.httpClient.get('http://localhost:3000/' + 'gettablas');
  }
  deletemaestros(){
    return this.httpClient.get('http://localhost:3000/' + 'deletemaestros');
  }

  deleteimagenes(){
    return this.httpClient.get('http://localhost:3000/' + 'borrarimagenes');
  }
  borrar(alltables:any){
    for(let nom of alltables){
      if(!this.tables.includes(nom.Table_Name)){
        if(nom.Table_Type=="VIEW"){
          this.dropView(nom.Table_Name).subscribe(data2=>{

          });
        }else{
          this.dropTable(nom.Table_Name).subscribe(data3=>{

          });
        }
      }
    }
    this.deletemaestros().subscribe(data=>{});

    this.deleteimagenes().subscribe(data=>{});

  }
  updateNuevoCiclo(Inicio,Final,CierreTotal){
    const body = new HttpParams()
    .set('Inicio', Inicio)
    .set('Final', Final)
    .set('CierreTotal', CierreTotal);
    return this.httpClient.post('http://localhost:3000/' + 'updateNuevoCiclo', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  asignadospor(Asignador:string){
    const body = new HttpParams()
    .set('Asignador', Asignador);
    return this.httpClient.post('http://localhost:3000/' + 'asignadospor', body.toString(),
    {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

}
