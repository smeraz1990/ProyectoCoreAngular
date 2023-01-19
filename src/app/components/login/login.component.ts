import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/usuario';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  loading= false;
  datoslogin:usuario[] = []

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private _loginService:LoginService){
    this.form = this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    })
  }

  Ingresar(){
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    this._loginService.login(usuario,password).subscribe(data => {
      this.datoslogin = data
      if (this.datoslogin.length == 1)
      {
        //direccionamos para entrar
        this.login()
        
      }
      else{
        //direccionamos para error de login
        this.error()
        this.form.reset()
  
      }
    })


   
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
