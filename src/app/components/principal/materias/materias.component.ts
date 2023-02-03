import { Component, Inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { materia } from 'src/app/interfaces/materia';
import { MateriaService } from 'src/app/services/materia.service';



@Injectable()
@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent {
  ELEMENT_DATA:materia[] = []
  displayedColumns: string[] = ['Materia', 'Maestro', 'Horario','Acciones'];
  dataSource!:MatTableDataSource<any>;
  tipoaccion = 0

  constructor(private _materiaService: MateriaService,private _snackBar: MatSnackBar,public dialog: MatDialog)
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

  //Acciones
  agregarCursoModal(id:number, tipoaccion:number)
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
      {datoscurso: data,tipoaccion}
    ]

    const dialogRef = this.dialog.open(DialogCursoComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //console.log(result)
        if(this.tipoaccion==0){
          this._materiaService.getmaxidUsuarios().subscribe((id: number) => {
            const curso:materia = result
            curso.ID= Number(id)+1

            this._materiaService.agregarMateria(curso).subscribe((curso)=>{
              this.cargarMaterias()
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
          this._materiaService.ModificarUsuario(result).subscribe((data: any) => {
            this.cargarMaterias()
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
  verMateria(id:number, tipoaccion:number)
  {
    this._materiaService.verMateria(id).subscribe((data: any) => {
      this.opcionesmodal(data,tipoaccion)

    })}

  eliminarMateria(id:number)
  {    
      this._materiaService.eliminarMateria(id).subscribe(data=>{
      this.cargarMaterias()
      this._snackBar.open(`El curso con id ${id} fue eliminado con exito`,'',{
        duration: 5000,
        horizontalPosition:'center',
        verticalPosition: 'bottom'
      })

    })
  }
  
}


@Component({
  selector: 'dialog-curos-dialog',
  templateUrl: 'dialog-curos-dialog.component.html',
  styleUrls: ['./materias.component.css']
})
export class DialogCursoComponent {
  form2!: FormGroup
  tipoaccion:number
  id:number;
  name:string;
  maestro:string;
  horario:string;
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,
  private router:Router,
  private _snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<DialogCursoComponent>,) {
    //console.log("aqui estamos",data)
    this.tipoaccion = data[0].tipoaccion;
    this.id = data[0].datoscurso.ID;
    this.name = data[0].datoscurso.Nombre;
    this.maestro = data[0].datoscurso.Maestro;
    this.horario = data[0].datoscurso.Horario;
  }

  ngOnInit() {
    //console.log("datos",this.description)
    this.form2 = this.fb.group(
      {
        ID: [this.id],
        Nombre: [this.name,Validators.required],
        Maestro: [this.maestro,Validators.required],
        Horario: [this.horario,Validators.required],
      }
    )


}
}
