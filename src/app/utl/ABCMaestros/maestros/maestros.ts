
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MaestrosUtl } from '../maestros-utl';
import { MaestrosApiService } from '../maestros-api.service';

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './maestros.html'
})
export class MaestrosComponent implements OnInit {

  maestros: MaestrosUtl[] = [];

  cargando = false;
  mensaje = '';
  errorMensaje = '';

  maestroEliminar: MaestrosUtl | null = null;
  eliminando = false;

  constructor(
    private maestrosApi: MaestrosApiService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMaestros();
  }

  cargarMaestros(): void {
    this.cargando = true;
    this.errorMensaje = '';
    this.detector.detectChanges();

    this.maestrosApi.getMaestros().subscribe({
      next: response => {
        console.log('Maestros recibidos de la API:', response);

        this.maestros = response || [];
        this.cargando = false;

        this.detector.detectChanges();
      },
      error: error => {
        console.error('Error al cargar maestros:', error);

        this.errorMensaje = 'No se pudieron cargar los maestros.';
        this.cargando = false;

        this.detector.detectChanges();
      }
    });
  }

  confirmarEliminar(maestro: MaestrosUtl): void {
    this.maestroEliminar = maestro;
    this.mensaje = '';
    this.errorMensaje = '';
  }

  cancelarEliminar(): void {
    this.maestroEliminar = null;
  }

  eliminarMaestro(): void {
    if (!this.maestroEliminar || this.eliminando) {
      return;
    }

    const id_maestro = this.maestroEliminar.id_maestro;

    this.eliminando = true;
    this.mensaje = '';
    this.errorMensaje = '';

    this.maestrosApi.eliminarMaestro(id_maestro).subscribe({
      next: response => {
        this.eliminando = false;

        if (response.exito) {
          this.maestroEliminar = null;
          this.mensaje = 'Maestro eliminado correctamente.';
          this.cargarMaestros();
        } else {
          this.errorMensaje = response.mensaje || 'No se pudo eliminar el maestro.';
        }

        this.detector.detectChanges();
      },
      error: error => {
        this.eliminando = false;
        console.error('Error al eliminar:', error);

        this.errorMensaje = error.error?.mensaje || 'Error al eliminar el maestro.';

        this.detector.detectChanges();
      }
    });
  }
}
