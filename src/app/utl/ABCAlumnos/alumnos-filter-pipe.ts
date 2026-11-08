import { Pipe, PipeTransform } from '@angular/core';
import { AlumnosUtl } from './alumnos-utl';

@Pipe({
  name: 'alumnosFilter',
  standalone: true
})
export class AlumnosFilterPipe implements PipeTransform {

  transform(
    alumnos: AlumnosUtl[] | null | undefined,
    filtro: string = ''
  ): AlumnosUtl[] {

    if (!alumnos) {
      return [];
    }

    const texto = (filtro || '').trim().toLowerCase();

    if (!texto) {
      return alumnos;
    }

    return alumnos.filter(alumno =>
      [
        alumno.matricula,
        alumno.nombre,
        alumno.apaterno,
        alumno.amaterno,
        alumno.correo
      ]
        .join(' ')
        .toLowerCase()
        .includes(texto)
    );
  }
}