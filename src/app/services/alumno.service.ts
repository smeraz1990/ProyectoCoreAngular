import { Injectable } from '@angular/core';
import { alumno } from '../interfaces/alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  ELEMENT_DATA: alumno[] = [
    {id: 1, nombre: 'Hydrogen', apellido: "rosas", pais: 'H'},
    {id: 2, nombre: 'Helium', apellido: "aispuro", pais: 'He'},
    {id: 3, nombre: 'Lithium', apellido: "torres", pais: 'Li'},
    {id: 4, nombre: 'Beryllium', apellido: "macias", pais: 'Be'},
    {id: 5, nombre: 'Boron', apellido: "orona", pais: 'B'},
    {id: 6, nombre: 'Carbon', apellido: "martinez", pais: 'C'},
    {id: 7, nombre: 'Nitrogen', apellido: "carmina", pais: 'N'},
    {id: 8, nombre: 'Oxygen', apellido: "rosales", pais: 'O'},
    {id: 9, nombre: 'Fluorine', apellido: "coronado", pais: 'F'},
    {id: 10,nombre: 'Neon', apellido: "meraz", pais: 'Ne'},
  ];

  constructor() { }

  getUsuario(){
    return this.ELEMENT_DATA.slice()
  }

  eliminarUsuario(id:number)
  {
    let index = this.ELEMENT_DATA.findIndex(d => d.id === id); //find index in your array
    this.ELEMENT_DATA.splice(index, 1);//remove element from array
  }

  getmaxidUsuarios()
  {
    const ids = this.ELEMENT_DATA.map(object => {
      return object.id;
    });
    return  Math.max(...ids);

  }

  agregarusuario(alumno:alumno)
  {
    this.ELEMENT_DATA.push(alumno)
  }
}
