
import { Pipe, PipeTransform } from '@angular/core';
import { MaestrosUtl } from './maestros-utl';

@Pipe({
  name: 'maestrosFilter',
  standalone: true
})
export class MaestrosFilterPipe implements PipeTransform {

  transform(
    maestros: MaestrosUtl[] | null | undefined,
    filtro: string = ''
  ): MaestrosUtl[] {

    if (!maestros) {
      return [];
    }

    const texto = (filtro || '').trim().toLowerCase();

    if (!texto) {
      return maestros;
    }

    return maestros.filter(maestro =>
      [
        maestro.id_maestro,
        maestro.nombre,
        maestro.apaterno,
        maestro.amaterno,
        maestro.correo
      ]
        .join(' ')
        .toLowerCase()
        .includes(texto)
    );
  }
}
