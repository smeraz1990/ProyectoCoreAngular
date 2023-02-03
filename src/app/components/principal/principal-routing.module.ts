import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { InicioComponent } from './inicio/inicio.component';
import { PrincipalComponent } from './principal.component';
import { CrearAlumnoComponent } from './alumnos/crear-alumno/crear-alumno.component'
import{InscripcionesComponent} from './inscripciones/inscripciones.component'
import { MateriasComponent } from './materias/materias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {path:'', component: PrincipalComponent,children:[
    {path: '', component: InicioComponent},
    {path: 'alumnos', component: AlumnosComponent},
    {path: 'materias', component: MateriasComponent},
    {path: 'crear-usuario', component: CrearAlumnoComponent},
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'Inscripciones/:id', component: InscripcionesComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
