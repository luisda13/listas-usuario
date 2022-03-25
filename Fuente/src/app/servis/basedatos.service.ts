import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/Usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasedatosService {
private urlAPI ='http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  
  getAllUsuarios(): Observable <Usuario[]>{
    const url = this.urlAPI+'/usuario/all';
    return this.http.get<Usuario[]>(url);
  }

  getUsuarios(){
    const id=1;
    const url = this.urlAPI+'/usuario/'+id;
    return this.http.get<Usuario>(url);
  }

 createUsuario(usuario: Usuario){
   console.log("si llego el crear mira "+usuario)
  const url = this.urlAPI+'/usuario/';
  return this.http.post(url,usuario);
 } 

 updateUsuario(usuario: Usuario,codUsuario:number){
  console.log("si llego el modificar mira "+usuario)
  const url = this.urlAPI+'/usuario/update/'+codUsuario;
  return this.http.put(url,usuario);
 }

 deleteUsuario(codUsuario:string){
  const url = this.urlAPI+'/usuario/delete/'+codUsuario;
  return this.http.delete(url);
 }
}
