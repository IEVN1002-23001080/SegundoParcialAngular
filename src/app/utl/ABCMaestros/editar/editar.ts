
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

import { MaestrosApiService } from '../maestros-api.service';

@Component({
  selector: 'app-editar-maestro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './editar.html'
})
export class EditarMaestro implements OnInit {

  formulario: FormGroup;
  id_maestro = 0;

  mensaje = '';
  cargando = false;
  cargandoDatos = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private maestrosApi: MaestrosApiService
  ) {
    this.formulario = this.fb.group({
      id_maestro: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {

    this.id_maestro = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!this.id_maestro || isNaN(this.id_maestro)) {
      this.mensaje = 'El ID del maestro no es válido.';
      this.cargandoDatos = false;
      return;
    }

    this.cargarMaestro();
  }

  cargarMaestro(): void {

    this.cargandoDatos = true;
    this.mensaje = '';

    this.maestrosApi.getMaestro(this.id_maestro).subscribe({

      next: response => {

        console.log('Respuesta de la API:', response);

        const maestro = response?.maestro ?? response;

        if (!maestro || !maestro.id_maestro) {
          this.mensaje = 'No se encontró el maestro.';
          this.cargandoDatos = false;
          return;
        }

        this.formulario.patchValue({
          id_maestro: maestro.id_maestro,
          nombre: maestro.nombre,
          apaterno: maestro.apaterno,
          amaterno: maestro.amaterno,
          correo: maestro.correo
        });

        console.log(
          'Valores del formulario:',
          this.formulario.getRawValue()
        );

        this.cargandoDatos = false;
      },

      error: error => {

        console.error('Error al consultar maestro:', error);

        this.mensaje = 'No se pudo cargar la información del maestro.';
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

    const datosMaestro = {
      ...this.formulario.getRawValue(),
      id_maestro: this.id_maestro
    };

    this.maestrosApi.modificarMaestro(
      this.id_maestro,
      datosMaestro
    ).subscribe({

      next: response => {

        this.cargando = false;

        if (response.exito) {
          this.router.navigate(['/utl/maestros']);
        } else {
          this.mensaje = response.mensaje || 'No se pudo actualizar el maestro.';
        }
      },

      error: error => {

        this.cargando = false;

        console.error('Error al actualizar:', error);

        this.mensaje = error.error?.mensaje || 'Error al actualizar el maestro.';
      }
    });
  }
}
