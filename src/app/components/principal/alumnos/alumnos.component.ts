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

  constructor(private _alumnoService:AlumnoService, private _snackBar: MatSnackBar,public dialog: MatDialog){}

  ngOnInit():void
  {
    this.cargarUsuarios()

  }

  cargarUsuarios()
  {
    this.ELEMENT_DATA = this._alumnoService.getUsuario();
    this.dataSource = new MatTableDataSource (this.ELEMENT_DATA)
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verUsuarios(id:number)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= "50%",
    dialogConfig.data=this._alumnoService.verUsuario(id)

       
    const dialogRef = this.dialog.open(DialogContentAlumnoDialogComponent,dialogConfig);


    

    dialogRef.afterClosed().subscribe(result => {
      //let datos = JSON.stringify(result)
      this._alumnoService.ModificarUsuario(result)
      this.cargarUsuarios()
      //console.log(`Dialog result: ${datos}`);
      //console.log(`Dialog result: ${result.id}`);
    }); 
    
  }

  eliminarUsuario(id:number)
  {    
    this._alumnoService.eliminarUsuario(id)
    this.cargarUsuarios()
    this._snackBar.open('El usuario fue eliminado con exito','',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition: 'bottom'
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
  id:number;
  name:string;
  apellido:string;
  pais:string;
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,
  private router:Router,
  private _snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<DialogContentAlumnoDialogComponent>,) {
    this.id = data[0].id;
    this.name = data[0].nombre;
    this.apellido = data[0].apellido;
    this.pais = data[0].pais;
  }

  ngOnInit() {
    //console.log("datos",this.description)
    this.form2 = this.fb.group(
      {
        id: [this.id,Validators.required],
        nombre: [this.name,Validators.required],
        apellido: [this.apellido,Validators.required],
        pais: [this.pais,Validators.required],
      }
    )


}
}


