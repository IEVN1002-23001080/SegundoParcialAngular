import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './zodiaco.html',
})

export class Zodiaco {

  nombre: string = '';
  apellidoP: string = '';
  apellidoM: string = '';

  dia: number = 0;
  mes: number = 0;
  anio: number = 0;

  sexo: string = '';

  edad: number = 0;
  signo: string = '';
  elemento: string = '';
  imagen: string = '';

  Calcular(): void {

    this.edad = 2026 - this.anio;

    if (this.anio % 12 == 0) {

      this.signo = 'Mono';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Mono-768x657-1.jpg';

    }

    else if (this.anio % 12 == 1) {

      this.signo = 'Gallo';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Gallo-768x657-1.jpg';

    }

    else if (this.anio % 12 == 2) {

      this.signo = 'Perro';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Perro-768x657-1.jpg';

    }

    else if (this.anio % 12 == 3) {

      this.signo = 'Cerdo';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Cerdo-768x657-1.jpg';

    }

    else if (this.anio % 12 == 4) {

      this.signo = 'Rata';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Rata-768x657-1.jpg';

    }

    else if (this.anio % 12 == 5) {

      this.signo = 'Buey';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Buey-768x657-1.jpg';

    }

    else if (this.anio % 12 == 6) {

      this.signo = 'Tigre';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Tigre-768x657-1.jpg';

    }

    else if (this.anio % 12 == 7) {

      this.signo = 'Conejo';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Conejo-768x657-1.jpg';

    }

    else if (this.anio % 12 == 8) {

      this.signo = 'Dragon';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Dragon-768x657-1.jpg';

    }

    else if (this.anio % 12 == 9) {

      this.signo = 'Serpiente';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Serpiente-768x657-1.jpg';

    }

    else if (this.anio % 12 == 10) {

      this.signo = 'Caballo';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Caballo-768x657-1.jpg';

    }

    else if (this.anio % 12 == 11) {

      this.signo = 'Cabra';
      this.imagen = 'https://ccl.uanl.mx/wp-content/uploads/2023/10/06_horoscopo_chino_Cabra-768x657-1.jpg';

    }

    if (this.anio % 10 == 0 || this.anio % 10 == 1) {
      this.elemento = 'Metal';
    }

    else if (this.anio % 10 == 2 || this.anio % 10 == 3) {
      this.elemento = 'Agua';
    }

    else if (this.anio % 10 == 4 || this.anio % 10 == 5) {
      this.elemento = 'Madera';
    }

    else if (this.anio % 10 == 6 || this.anio % 10 == 7) {
      this.elemento = 'Fuego';
    }

    else if (this.anio % 10 == 8 || this.anio % 10 == 9) {
      this.elemento = 'Tierra';
    }

  }

}