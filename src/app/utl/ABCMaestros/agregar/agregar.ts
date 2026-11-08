
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MaestrosApiService } from '../maestros-api.service';

@Component({
  selector: 'app-agregar-maestro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './agregar.html'
})
export class AgregarMaestro {

  formulario: FormGroup;
  cargando = false;
  mensaje = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private maestrosApi: MaestrosApiService
  ) {
    this.formulario = this.fb.group({
      id_maestro: ['', [Validators.required, Validators.min(1)]],
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

    const datosMaestro = this.formulario.getRawValue();

    this.maestrosApi.agregarMaestro(datosMaestro).subscribe({

      next: response => {
        this.cargando = false;

        if (response.exito) {
          this.router.navigate(['/utl/maestros']);
        } else {
          this.mensaje = response.mensaje || 'No se pudo registrar el maestro.';
        }
      },

      error: error => {
        this.cargando = false;
        console.error('Error al agregar maestro:', error);

        this.mensaje = error.error?.mensaje || 'Error al registrar el maestro.';
      }
    });
  }
}
