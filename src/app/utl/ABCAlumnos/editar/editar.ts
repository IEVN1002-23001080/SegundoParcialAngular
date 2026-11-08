
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './editar.html'
})
export class Editar implements OnInit {

  formulario: FormGroup;
  matricula = 0;

  mensaje = '';
  cargando = false;
  cargandoDatos = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private alumnosUtl: ProyectoapiService
  ) {
    this.formulario = this.fb.group({
      matricula: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.matricula = Number(
      this.route.snapshot.paramMap.get('matricula')
    );

    if (!this.matricula || isNaN(this.matricula)) {
      this.mensaje = 'La matrícula no es válida.';
      this.cargandoDatos = false;
      return;
    }

    this.cargarAlumno();
  }

  cargarAlumno(): void {
    this.cargandoDatos = true;
    this.mensaje = '';

    this.alumnosUtl.getAlumno(this.matricula).subscribe({
      next: response => {

        console.log('Respuesta de la API:', response);

        const alumno = response?.alumno ?? response;

        if (!alumno || !alumno.matricula) {
          this.mensaje = 'No se encontró el alumno o la respuesta de la API no tiene el formato esperado.';
          this.cargandoDatos = false;
          return;
        }

        this.formulario.patchValue({
          matricula: alumno.matricula,
          nombre: alumno.nombre,
          apaterno: alumno.apaterno,
          amaterno: alumno.amaterno,
          correo: alumno.correo
        });

        console.log(
          'Valores del formulario:',
          this.formulario.getRawValue()
        );

        console.log(
          'Estado del formulario:',
          this.formulario.status
        );

        this.cargandoDatos = false;
      },

      error: error => {
        console.error('Error al consultar alumno:', error);

        this.mensaje = 'No se pudo cargar la información del alumno.';
        this.cargandoDatos = false;
      }
    });
  }

  onSubmit(): void {

    if (this.formulario.invalid || this.cargando) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    const datosAlumno = {
      ...this.formulario.getRawValue(),
      matricula: this.matricula
    };

    this.alumnosUtl.modificarAlumno(
      this.matricula,
      datosAlumno
    ).subscribe({

      next: response => {
        this.cargando = false;

        if (response.exito) {
          this.router.navigate(['/utl/alumnos'], {
            queryParams: {
              mensaje: 'Alumno actualizado correctamente.'
            }
          });
        } else {
          this.mensaje = response.mensaje || 'No se pudo actualizar el alumno.';
        }
      },

      error: error => {
        this.cargando = false;

        console.error('Error al actualizar:', error);

        this.mensaje = error.error?.mensaje || 'Error al actualizar el alumno.';
      }
    });
  }
}
