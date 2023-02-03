import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private httpCliente: HttpClient) { }

  getUsuarios(): Observable<usuario[]>{
    return this.httpCliente.get<usuario[]>("https://63c8593b5c0760f69aca6737.mockapi.io/Usuarios")
  }

  eliminarUsuario(id:number): Observable<void>
  {
    return this.httpCliente.delete<void>(`https://63c8593b5c0760f69aca6737.mockapi.io/Usuarios/${id}`)
    //let index = this.ELEMENT_DATA.findIndex(d => d.id === id); //find index in your array
    //this.ELEMENT_DATA.splice(index, 1);//remove element from array
  }

  ModificarUsuario(datanew: usuario): Observable<void>
  {
    //console.log("datos a guardar", datanew.id)
    return this.httpCliente.put<void>(`https://63c8593b5c0760f69aca6737.mockapi.io/Usuarios/${datanew.ID}`, datanew)
    
  }

  

  verUsuario(id:number): Observable<usuario[]>
  {
    return this.httpCliente.get<usuario[]>(`https://63c8593b5c0760f69aca6737.mockapi.io/Usuarios/${id}`)
  }

  getmaxidUsuarios()
  {
    return this.httpCliente
    .get<usuario[]>("https://63c8593b5c0760f69aca6737.mockapi.io/Usuarios")
    .pipe(
      map(data =>{
        if(data.length > 0)
        {
          return data[data.length-1].ID;
        }
        else
        {
          return 0;
        }
      } )
    )
  
    //return  Math.max(...ids);

  }

  agregarusuario(alumno:usuario)
  {
    return this.httpCliente.post<usuario[]>(`https://63c8593b5c0760f69aca6737.mockapi.io/Usuarios`, alumno)
    //this.ELEMENT_DATA.push(alumno)
  }
}
