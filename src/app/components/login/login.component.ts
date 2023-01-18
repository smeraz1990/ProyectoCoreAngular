import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading= false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router){
    this.form = this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    })
  }

  Ingresar(){
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if (usuario == "jperez" && password == "admin123" )
    {
      //direccionamos para entrar
      this.login()
      
    }
    else{
      //direccionamos para error de login
      this.error()
      this.form.reset()

    }
  }

  error(){
    this._snackBar.open('Usuario o Contraseña Invalido','',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition: 'bottom'
    })
  }

  login(){
    this.loading = true;
    setTimeout(() => {
      //redireccionamos a login
      this.router.navigate(['principal'])
    },1500)
  }


  

}
