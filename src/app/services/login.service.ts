import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpCliente: HttpClient) { }

  login(user:string,password:string): Observable<usuario[]>{
    return this.httpCliente.get<usuario[]>(`https://63c8593b5c0760f69aca6737.mockapi.io/Usuarios?user=${user}&password=${password}`)
  }
}
