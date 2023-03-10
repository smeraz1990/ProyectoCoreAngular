import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { alumno } from '../interfaces/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {


  constructor(private httpCliente: HttpClient) { }

  getAlumnos(): Observable<alumno[]>{
    return this.httpCliente.get<alumno[]>("https://63c8593b5c0760f69aca6737.mockapi.io/Alumnos")
  }

  eliminarUsuario(id:number): Observable<void>
  {
    return this.httpCliente.delete<void>(`https://63c8593b5c0760f69aca6737.mockapi.io/Alumnos/${id}`)
    //let index = this.ELEMENT_DATA.findIndex(d => d.id === id); //find index in your array
    //this.ELEMENT_DATA.splice(index, 1);//remove element from array
  }

  ModificarUsuario(datanew: alumno): Observable<void>
  {
    //console.log("datos a guardar", datanew.id)
    return this.httpCliente.put<void>(`https://63c8593b5c0760f69aca6737.mockapi.io/Alumnos/${datanew.ID}`, datanew)
    
  }

  

  verUsuario(id:number): Observable<alumno[]>
  {
    return this.httpCliente.get<alumno[]>(`https://63c8593b5c0760f69aca6737.mockapi.io/Alumnos/${id}`)
  }

  getmaxidUsuarios()
  {
    return this.httpCliente
    .get<alumno[]>("https://63c8593b5c0760f69aca6737.mockapi.io/Alumnos")
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

  agregarusuario(alumno:alumno)
  {
    return this.httpCliente.post<alumno[]>(`https://63c8593b5c0760f69aca6737.mockapi.io/Alumnos`, alumno)
    //this.ELEMENT_DATA.push(alumno)
  }
}
