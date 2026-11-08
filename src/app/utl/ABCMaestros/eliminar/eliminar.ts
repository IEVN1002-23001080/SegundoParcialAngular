import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { MaestrosApiService } from '../maestros-api.service';

@Component({
  selector: 'app-eliminar-maestro',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './eliminar.html'
})
export class EliminarMaestro implements OnInit {

  id_maestro = 0;
  maestro: any = null;

  mensaje = '';
  cargando = true;
  eliminando = false;
  confirmar = false;

  constructor(
    private route: ActivatedRoute,
    private maestrosApi: MaestrosApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id_maestro = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!this.id_maestro) {
      this.router.navigate(['/utl/maestros']);
      return;
    }

    this.cargarMaestro();
  }

  cargarMaestro(): void {
    this.maestrosApi.getMaestro(this.id_maestro).subscribe({
      next: response => {
        console.log('Maestro recibido:', response);

        this.maestro = response.maestro ?? response;
        this.cargando = false;

        if (!this.maestro || !this.maestro.id_maestro) {
          this.maestro = null;
          this.mensaje = 'No se encontró el maestro.';
        }
      },
      error: error => {
        console.error('Error al consultar maestro:', error);
        this.mensaje = 'No se pudo cargar la información del maestro.';
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

    this.maestrosApi.eliminarMaestro(this.id_maestro).subscribe({
      next: response => {
        this.eliminando = false;

        if (response.exito) {
          this.router.navigate(['/utl/maestros'], {
            queryParams: {
              mensaje: 'Maestro eliminado correctamente.'
            }
          });
        } else {
          this.mensaje = response.mensaje || 'No se pudo eliminar el maestro.';
          this.confirmar = false;
        }
      },
      error: error => {
        this.eliminando = false;
        console.error('Error al eliminar:', error);
        this.mensaje = error.error?.mensaje || 'Error al eliminar el maestro.';
        this.confirmar = false;
      }
    });
  }
}