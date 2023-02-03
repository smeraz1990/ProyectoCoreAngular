import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service ';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  ELEMENT_DATA:usuario[] = []
  displayedColumns: string[] = ['ID', 'Email', 'Password', 'Token','Admin','Acciones'];
  dataSource!:MatTableDataSource<any>;
  tipoaccion = 0
  usuarioid = localStorage.getItem('iduser')

  constructor(private _usuarioService:UsuarioService, private dialog: MatDialog,
    private _snackBar: MatSnackBar){}

    ngOnInit():void
  {
    this.cargarUsuarios()

  }


  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarUsuarios()
  {
    this._usuarioService.getUsuarios().subscribe(data => {
      this.ELEMENT_DATA = data
      this.dataSource = new MatTableDataSource (this.ELEMENT_DATA)
    })
  }

  verUsuarios(id:number, tipoaccion:number)
  {
    this._usuarioService.verUsuario(id).subscribe((data: any) => {
      this.opcionesmodal(data.data,tipoaccion)
    })
    
  }

  agregarUsuarioModal(id:number, tipoaccion:number)
  {
    this.opcionesmodal([],tipoaccion)
  }

  opcionesmodal(data: any,tipoaccion: number)
  {
    data = data
    this.tipoaccion = tipoaccion
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= "50%",
    dialogConfig.disableClose= true,
    dialogConfig.data=[
      {datosusuario: data,tipoaccion}
    ]

    const dialogRef = this.dialog.open(DialogContentUsuarioDialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //console.log(result)
        if(this.tipoaccion==0){
          this._usuarioService.getmaxidUsuarios().subscribe((id: number) => {
            const curso:usuario = result
            curso.ID= Number(id)+1

            this._usuarioService.agregarusuario(curso).subscribe((curso)=>{
              this.cargarUsuarios()
              this._snackBar.open('El curso fue agregado con exito','',{
                duration: 5000,
                horizontalPosition:'center',
                verticalPosition: 'bottom'
              })
            })
          })
        }
        else
        {
          this._usuarioService.ModificarUsuario(result).subscribe((data: any) => {
            this.cargarUsuarios()
            this._snackBar.open('El Curso fue modificado con exito','',{
              duration: 5000,
              horizontalPosition:'center',
              verticalPosition: 'bottom'
            })
          })
        }
      }
      
      //console.log(`Dialog result: ${datos}`);
      //console.log(`Dialog result: ${result.id}`);
    });

  }

  
  eliminarUsuario(id:number)
  {    
    this._usuarioService.eliminarUsuario(id).subscribe(data=>{
      this.cargarUsuarios()
      this._snackBar.open(`El usuario con id ${id} fue eliminado con exito`,'',{
        duration: 5000,
        horizontalPosition:'center',
        verticalPosition: 'bottom'
      })

    })
  }
  
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-content-usuario-dialog.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class DialogContentUsuarioDialogComponent {
  form2!: FormGroup
  tipoaccion:number
  id:number;
  email:string;
  nombre:string;
  apellido:string;
  password:number;
  token:string;
  bitadmin:boolean;
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,
  private router:Router,
  private _snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<DialogContentUsuarioDialogComponent>,) {
    this.tipoaccion = data[0].tipoaccion;
    this.id = data[0].datosusuario.ID;
    this.email = data[0].datosusuario.Email;
    this.nombre = data[0].datosusuario.First_name;
    this.apellido = data[0].datosusuario.Last_name;
    this.password = data[0].datosusuario.Password;
    this.token = data[0].datosusuario.Token;
    this.bitadmin = Boolean(Number(data[0].datosusuario.Bitadmin));
  }

  ngOnInit() {
    //console.log("datos",this.description)
    this.form2 = this.fb.group(
      {
        ID: [this.id],
        Email: [this.email,Validators.required],
        First_name: [this.nombre,Validators.required],
        Last_name: [this.apellido,Validators.required],
        Password: [this.password,Validators.required],
        Token: [this.token,Validators.required],
        Bitadmin: [this.bitadmin],
      }
    )


}
}

