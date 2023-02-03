import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { materia } from '../interfaces/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  root_url = "https://63c8593b5c0760f69aca6737.mockapi.io/Materias"

  constructor(private httpCliente: HttpClient) { }

  getMaterias(): Observable<materia[]>{
    return this.httpCliente.get<materia[]>("https://63c8593b5c0760f69aca6737.mockapi.io/Materias")
  }

  verMateria(id:number)
  {
    return this.httpCliente.get<materia[]>(`https://63c8593b5c0760f69aca6737.mockapi.io/Materias/${id}`)
  }

  ModificarUsuario(datanew: materia): Observable<void>
  {
    //console.log("datos a guardar", datanew.id)
    return this.httpCliente.put<void>(`https://63c8593b5c0760f69aca6737.mockapi.io/Materias/${datanew.ID}`, datanew)
    
  }

  
  eliminarMateria(id:number): Observable<void>
  {
    return this.httpCliente.delete<void>(`https://63c8593b5c0760f69aca6737.mockapi.io/Materias/${id}`)
    //let index = this.ELEMENT_DATA.findIndex(d => d.id === id); //find index in your array
    //this.ELEMENT_DATA.splice(index, 1);//remove element from array
  }

  getmaxidUsuarios()
  {
    return this.httpCliente
    .get<materia[]>("https://63c8593b5c0760f69aca6737.mockapi.io/Materias")
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

  
  agregarMateria(curso:materia)
  {
    return this.httpCliente.post<materia[]>(`https://63c8593b5c0760f69aca6737.mockapi.io/Materias`, curso)
    //this.ELEMENT_DATA.push(alumno)
  }

}
