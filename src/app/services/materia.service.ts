import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
