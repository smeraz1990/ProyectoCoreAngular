import { Component, EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { inscripcion } from 'src/app/interfaces/inscripcion';
import { Router,ActivatedRoute } from '@angular/router';
import { AlumnoService } from 'src/app/services/alumno.service';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MateriaService } from 'src/app/services/materia.service';
import { materia } from 'src/app/interfaces/materia';

@Injectable()
@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent {
  ELEMENT_DATA:inscripcion[] = []
  displayedColumns: string[] = ['Materia','Acciones'];
  dataSource!:MatTableDataSource<any>;
  NomnbreAlumno= ''
  idalumno = 0
  constructor(private router:Router, 
    private route:ActivatedRoute,
    private _alumnoService:AlumnoService,
    private _inscripcionService:InscripcionService,
    private _materiaService: MateriaService,
    public dialog: MatDialog
    ,private _snackBar: MatSnackBar){
    const {id} = this.route.snapshot.params
    this.idalumno = id
  }




  ngOnInit():void
  {
    
    this.datosalumno(this.idalumno)
    this.cargarinscripciones(this.idalumno)
    

  }

datosalumno(id: number)
{
  this._alumnoService.verUsuario(id).subscribe((data: any) => {
    this.NomnbreAlumno = `${data.nombre} ${data.apellido}`
  })
}

cargarinscripciones(id: number)
{
  this._inscripcionService.getInscripciones(id).subscribe((data: any) => {
    this.ELEMENT_DATA = data
    this.dataSource = new MatTableDataSource (this.ELEMENT_DATA)
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

ModalAddCurso(){
  this._materiaService.getMaterias().subscribe(data => {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width= "50%",
  dialogConfig.disableClose= true,
  dialogConfig.data= data
  const dialogRef = this.dialog.open(DialogInscripcionComponent,dialogConfig);
  dialogRef.componentInstance.onSubmit.subscribe((result) => {
  if(result){
    let findmateria = this.ELEMENT_DATA.filter(datamaterias=> Number(datamaterias.Idcurso) == Number(result.cbxCursos)).length
    if (findmateria == 0)
    {
      let nombremateria = data.filter(datamateria=> Number(datamateria.ID) == Number(result.cbxCursos))
      this._inscripcionService.getmaxidInscripciones().subscribe((id: number) => {
        const inscripcion: inscripcion = {
          "ID": id,
          "Materia": nombremateria[0].Nombre,
          "Idalumno": this.idalumno,
          "Idcurso": result.cbxCursos
        }
        this._inscripcionService.agregarInscripcion(inscripcion).subscribe(()=>{
          this.cargarinscripciones(this.idalumno)
          this._snackBar.open('El curso fue agregado al alumno','',{
            duration: 5000,
            horizontalPosition:'center',
            verticalPosition: 'bottom'
          })
          dialogRef.close();
        })

        //console.log(`${nombremateria[0].nombre}  ${this.idalumno} , ${result.cbxCursos}, ${id}`)
      })
    }
    else
    {
      this._snackBar.open('Este curso ya existeen el alumno','',{
        duration: 5000,
        horizontalPosition:'center',
        verticalPosition: 'bottom'
      })
    }
  }
    
     
     // IF VALID THEN CLOSE
     //dialogRef.close();
   });
})
}

eliminarInscripcion(id:number)
{    
    this._inscripcionService.eliminarInscripcion(id).subscribe(data=>{
    this.cargarinscripciones(this.idalumno)
    this._snackBar.open(`Se elimino la incripcion al curso con exito`,'',{
      duration: 5000,
      horizontalPosition:'center',
      verticalPosition: 'bottom'
    })

  })
}

}




@Component({
  selector: 'dialog-inscripcion-dialog',
  templateUrl: 'dialog-inscripcion-dialog.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class DialogInscripcionComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  form2!: FormGroup
  cursos:materia[] = []
  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,
  private router:Router,
  private _snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<DialogInscripcionComponent>,) {
    //console.log("aqui estamos",data)
    this.cursos = data
    
  }

  ngOnInit() {
    //console.log("datos",this.description)
    
    this.form2 = this.fb.group(
      {
        cbxCursos: ["",Validators.required],
      }
    )
}
submitButtonClick(form:any) { // this function should be called in the template on `click`
  this.onSubmit.emit(form);
}
}
