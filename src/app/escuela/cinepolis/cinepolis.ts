import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cinepolis',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cinepolis.html'
})


export class Cinepolis implements OnInit {

  formulario!: FormGroup;

  valorPagar: number = 0;
  boletosMaximos: number = 0;
  mensaje: string = '';

  ngOnInit(): void {

    this.formulario = new FormGroup({

      nombre: new FormControl(''),

      cantidadCompradores: new FormControl(''),

      tarjetaCineco: new FormControl('No'),

      cantidadBoletos: new FormControl('')

    });

  }

  procesar(): void {

    let nombre = this.formulario.get('nombre')?.value;
    let compradores = this.formulario.get('cantidadCompradores')?.value;
    let boletos = this.formulario.get('cantidadBoletos')?.value;
    let tarjeta = this.formulario.get('tarjetaCineco')?.value;

    this.boletosMaximos = compradores * 7;

    if (boletos > this.boletosMaximos) {

      this.valorPagar = 0;
      this.mensaje = 'La cantidad de boletos supera el máximo permitido.';

    } else {

      let total = boletos * 12;

      if (boletos > 5) {

        total = total - (total * 0.15);

      } else if (boletos >= 3) {

        total = total - (total * 0.10);

      }

      if (tarjeta == 'Si') {

        total = total - (total * 0.10);

      }

      this.valorPagar = total;
      this.mensaje = 'Compra realizada por: ' + nombre;

    }

  }

  salir(): void {

    this.formulario.reset({
      nombre: '',
      cantidadCompradores: '',
      tarjetaCineco: 'No',
      cantidadBoletos: ''
    });

    this.valorPagar = 0;
    this.boletosMaximos = 0;
    this.mensaje = '';

  }

}