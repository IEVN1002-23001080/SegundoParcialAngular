
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AlumnosUtl } from '../alumnos-utl';
import { ProyectoapiService } from '../proyectoapi.service';
import { AlumnosFilterPipe } from '../alumnos-filter-pipe';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    AlumnosFilterPipe
  ],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css'
})
export class AlumnosComponent implements OnInit {

  alumnos: AlumnosUtl[] = [];
  listFilter = '';

  errorMensaje = '';
  mensaje = '';

  cargando = false;
  alumnoEliminar: AlumnosUtl | null = null;
  eliminando = false;

  constructor(
    private proyectoapiService: ProyectoapiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarAlumnos();

    this.route.queryParams.subscribe(params => {
      this.mensaje = params['mensaje'] || '';
      this.cdr.detectChanges();
    });
  }

  cargarAlumnos(): void {
    this.cargando = true;
    this.errorMensaje = '';
    this.cdr.detectChanges();

    this.proyectoapiService.getAlumnos().subscribe({
      next: response => {
        console.log('Alumnos recibidos de la API:', response);

        this.alumnos = response || [];
        this.errorMensaje = '';
        this.cargando = false;

        this.cdr.detectChanges();
      },
      error: error => {
        console.error('Error al consultar alumnos:', error);

        this.errorMensaje = 'No se pudieron cargar los alumnos.';
        this.cargando = false;

        this.cdr.detectChanges();
      }
    });
  }

  confirmarEliminar(alumno: AlumnosUtl): void {
    this.alumnoEliminar = alumno;
    this.mensaje = '';
  }

  cancelarEliminar(): void {
    this.alumnoEliminar = null;
  }

  eliminarAlumno(): void {
    if (!this.alumnoEliminar || this.eliminando) {
      return;
    }

    const matricula = this.alumnoEliminar.matricula;

    this.eliminando = true;
    this.mensaje = '';

    this.proyectoapiService.eliminarAlumno(matricula).subscribe({
      next: response => {
        this.eliminando = false;

        if (response.exito) {
          this.alumnoEliminar = null;
          this.mensaje = 'Alumno eliminado correctamente.';
          this.cargarAlumnos();
        } else {
          this.errorMensaje = response.mensaje || 'No se pudo eliminar el alumno.';
        }

        this.cdr.detectChanges();
      },
      error: error => {
        this.eliminando = false;
        console.error('Error al eliminar:', error);

        this.errorMensaje = error.error?.mensaje || 'Error al eliminar el alumno.';

        this.cdr.detectChanges();
      }
    });
  }
}
