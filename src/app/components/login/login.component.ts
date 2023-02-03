import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  public loading = false
  public gologinid = 0
  public form = new FormGroup({
    usuario: new FormControl('michael.lawson@reqres.in', [Validators.required]),
    password: new FormControl('cityslicka', [Validators.required]),
  })
  private destroyed$ = new Subject();

  constructor(
    private readonly authService: LoginService,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true)
  }

  login() {
    this.loading = true
    this.gologinid = 0
    
    const email = this.form.get('usuario')?.value || ''
    const password = this.form.get('password')?.value || ''
    this.authService.getusuarios().subscribe((user) => {
      user.forEach((value: any, index: any) => {
        if(value.Email === email && value.Password ===password)
        {
          this.gologinid = value.ID
        }
        
      });
      if(this.gologinid != 0)
        {
          this.authService.login(this.gologinid).subscribe((user) => {
            if (user) {
              this.router.navigate(['principal', 'alumnos'])
              this.loading = false
            }            
          })
        }
        else{
          this.loading = false;
          this._snackBar.open('El usuario y/o contraseña son incorrectos','',{
            duration: 5000,
            horizontalPosition:'center',
            verticalPosition: 'bottom'
          })
        }
    })
    

  }
}

