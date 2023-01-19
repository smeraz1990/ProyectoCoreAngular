import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { materia } from 'src/app/interfaces/materia';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent {
  ELEMENT_DATA:materia[] = []
  displayedColumns: string[] = ['Materia', 'Maestro', 'Horario'];
  dataSource!:MatTableDataSource<any>;

  constructor(private _materiaService: MateriaService)
  {

  }

  ngOnInit():void
  {
    this.cargarMaterias()

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  cargarMaterias()
  {
    this._materiaService.getMaterias().subscribe(data => {
      this.ELEMENT_DATA = data
      this.dataSource = new MatTableDataSource (this.ELEMENT_DATA)
    })
   
  }
}
