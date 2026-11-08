import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './eliminar.html'
})
export class Eliminar implements OnInit {

  matricula = 0;
  alumno: any = null;

  mensaje = '';
  cargando = true;
  eliminando = false;
  confirmar = false;

  constructor(
    private route: ActivatedRoute,
    private alumnosUtl: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.matricula = Number(
      this.route.snapshot.paramMap.get('matricula')
    );

    if (!this.matricula) {
      this.router.navigate(['/utl/alumnos']);
      return;
    }

    this.cargarAlumno();
  }

  cargarAlumno(): void {
    this.alumnosUtl.getAlumno(this.matricula).subscribe({
      next: response => {
        this.alumno = response.alumno;
        this.cargando = false;

        if (!this.alumno) {
          this.mensaje = 'No se encontró el alumno.';
        }
      },
      error: error => {
        console.error('Error al consultar alumno:', error);
        this.mensaje = 'No se pudo cargar la información del alumno.';
        this.cargando = false;
      }
    });
  }

  eliminar(): void {
    if (!this.confirmar || this.eliminando) {
      return;
    }

    this.eliminando = true;
    this.mensaje = '';

    this.alumnosUtl.eliminarAlumno(this.matricula).subscribe({
      next: response => {
        this.eliminando = false;

        if (response.exito) {
          this.router.navigate(['/utl/alumnos'], {
            queryParams: {
              mensaje: 'Alumno eliminado correctamente.'
            }
          });
        } else {
          this.mensaje = response.mensaje || 'No se pudo eliminar el alumno.';
          this.confirmar = false;
        }
      },
      error: error => {
        this.eliminando = false;
        console.error('Error al eliminar:', error);
        this.mensaje = error.error?.mensaje || 'Error al eliminar el alumno.';
        this.confirmar = false;
      }
    });
  }
}