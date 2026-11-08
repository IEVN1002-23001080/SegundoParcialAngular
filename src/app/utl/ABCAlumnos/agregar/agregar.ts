import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './agregar.html'
})
export class AgregarComponent {

  formulario: FormGroup;
  mensaje = '';
  cargando = false;

  constructor(
    private alumnosUtl: ProyectoapiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid || this.cargando) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    this.alumnosUtl.agregarAlumno(this.formulario.value).subscribe({
      next: response => {
        this.cargando = false;

        if (response.exito) {
          this.router.navigate(['/utl/alumnos'], {
            queryParams: {
              mensaje: 'Alumno agregado correctamente.'
            }
          });
        } else {
          this.mensaje = response.mensaje || 'No se pudo agregar el alumno.';
        }
      },
      error: error => {
        this.cargando = false;
        console.error('Error al agregar:', error);
        this.mensaje = error.error?.mensaje || 'Error al agregar el alumno.';
      }
    });
  }
}