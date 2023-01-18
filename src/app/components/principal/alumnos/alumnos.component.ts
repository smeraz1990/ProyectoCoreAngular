import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { alumno } from 'src/app/interfaces/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';



@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {
  ELEMENT_DATA:alumno[] = []
  displayedColumns: string[] = ['ID', 'Nombre', 'Apellido', 'Pais', 'Acciones'];
  dataSource!:MatTableDataSource<any>;

  constructor(private _alumnoService:AlumnoService, private _snackBar: MatSnackBar){}

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
