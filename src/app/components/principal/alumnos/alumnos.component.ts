import { Component, Inject, Injectable, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { alumno } from 'src/app/interfaces/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import {MatDialog,MatDialogRef,MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import{DialogContentAlumnoDialogComponent} from './dialog-content-alumno-dialog/dialog-content-alumno-dialog.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Injectable()
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {
  ELEMENT_DATA:alumno[] = []
  displayedColumns: string[] = ['ID', 'Nombre', 'Apellido', 'Pais', 'Acciones'];
  dataSource!:MatTableDataSource<any>;
  tipoaccion = 0

  constructor(private _alumnoService:AlumnoService, private _snackBar: MatSnackBar,public dialog: MatDialog){}

  ngOnInit():void
  {
    this.cargarUsuarios()

  }

  cargarUsuarios()
  {
    this._alumnoService.getAlumnos().subscribe(data => {
      this.ELEMENT_DATA = data
      this.dataSource = new MatTableDataSource (this.ELEMENT_DATA)
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verUsuarios(id:number, tipoaccion:number)
  {
    let data
    this._alumnoService.verUsuario(id).subscribe((data: any) => {
      data = data
      this.tipoaccion = tipoaccion
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width= "50%",
      dialogConfig.disableClose= true,
      dialogConfig.data=[
        {datosusuario: data,tipoaccion}
      ]
  
         
      const dialogRef = this.dialog.open(DialogContentAlumnoDialogComponent,dialogConfig);
  
  
      
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this._alumnoService.ModificarUsuario(result).subscribe((data: any) => {
            this.cargarUsuarios()
            this._snackBar.open('El alumno fue modificado con exito','',{
              duration: 5000,
              horizontalPosition:'center',
              verticalPosition: 'bottom'
            })
          })
        }
        
        //console.log(`Dialog result: ${datos}`);
        //console.log(`Dialog result: ${result.id}`);
      }); 
    })
    
  }
  

  eliminarUsuario(id:number)
  {    
    this._alumnoService.eliminarUsuario(id).subscribe(data=>{
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
  templateUrl: 'dialog-content-alumno-dialog.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class DialogContentAlumnoDialogComponent {
  form2!: FormGroup
  tipoaccion:number
  id:number;
  name:string;
  apellido:string;
  pais:string;
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,
  private router:Router,
  private _snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<DialogContentAlumnoDialogComponent>,) {
    //console.log("aqui estamos",data)
    this.tipoaccion = data[0].tipoaccion;
    this.id = data[0].datosusuario.ID;
    this.name = data[0].datosusuario.Nombre;
    this.apellido = data[0].datosusuario.Apellido;
    this.pais = data[0].datosusuario.Pais;
  }

  ngOnInit() {
    //console.log("datos",this.description)
    this.form2 = this.fb.group(
      {
        ID: [this.id,Validators.required],
        Nombre: [this.name,Validators.required],
        Apellido: [this.apellido,Validators.required],
        Pais: [this.pais,Validators.required],
      }
    )


}
}


