import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { inscripcion } from '../interfaces/inscripcion';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  constructor(private httpCliente: HttpClient) { }

  getInscripciones(idalumno:number): Observable<inscripcion[]>{
    return this.httpCliente.get<inscripcion[]>("https://63c8593b5c0760f69aca6737.mockapi.io/inscripciones").pipe(
      map(cursos => {
        return cursos.filter((curso: { Idalumno: number; }) => { 
            return curso.Idalumno == idalumno
        })
    })
    )
  }
  
  eliminarInscripcion(id:number): Observable<void>
  {
    return this.httpCliente.delete<void>(`https://63c8593b5c0760f69aca6737.mockapi.io/inscripciones/${id}`)
    //let index = this.ELEMENT_DATA.findIndex(d => d.id === id); //find index in your array
    //this.ELEMENT_DATA.splice(index, 1);//remove element from array
  }

  getmaxidInscripciones()
  {
    return this.httpCliente
    .get<inscripcion[]>("https://63c8593b5c0760f69aca6737.mockapi.io/inscripciones")
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

  
  agregarInscripcion(inscripcion:inscripcion)
  {
    return this.httpCliente.post<inscripcion[]>(`https://63c8593b5c0760f69aca6737.mockapi.io/inscripciones`, inscripcion)
    //this.ELEMENT_DATA.push(alumno)
  }

}
