import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { alumno } from 'src/app/interfaces/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent {
 form: FormGroup

 constructor(private fb: FormBuilder,private _alumnoService:AlumnoService,
  private router:Router,
  private _snackBar: MatSnackBar){
  this.form = fb.group(
    {
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      pais: ['',Validators.required]
    }
  )

 }


 agregarUsuario()
 {
   this._alumnoService.getmaxidUsuarios().subscribe((id: any) => {
    //console.log("Esta es la info regresada",data)
    const alumnos:alumno = {
      ID: id + 1,
      Nombre: this.form.value.nombre,
      Apellido: this.form.value.apellido,
      Pais: this.form.value.pais
    }
    this._alumnoService.agregarusuario(alumnos).subscribe((registro)=>{
      this.router.navigate(['/principal/alumnos'])
      this._snackBar.open('El alumno fue agregado con exito','',{
        duration: 5000,
        horizontalPosition:'center',
        verticalPosition: 'bottom'
      })
    })
  })
  /* const alumnos:alumno = {
    id: id + 1,
    nombre: this.form.value.nombre,
    apellido: this.form.value.apellido,
    pais: this.form.value.pais
  }
  this._alumnoService.agregarusuario(alumnos)
  this.router.navigate(['/principal/alumnos'])
  this._snackBar.open('El alumno fue agregado con exito','',{
    duration: 5000,
    horizontalPosition:'center',
    verticalPosition: 'bottom'
  }) */
 }
 
}
