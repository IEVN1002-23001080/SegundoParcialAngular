import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cinepolis.html'
})
export class Cinepolis implements OnInit {

  formulario!: FormGroup;

  valorPagar: number = 0;
  boletosMaximos: number = 0;
  mensaje: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      cantidadCompradores: new FormControl(''),
      tarjetaCineco: new FormControl('No'),
      cantidadBoletos: new FormControl('')
    });

  }

  procesar(): void {

    const nombre = this.formulario.get('nombre')?.value?.trim();

    const compradores = Number(
      this.formulario.get('cantidadCompradores')?.value
    );

    const boletos = Number(
      this.formulario.get('cantidadBoletos')?.value
    );

    const tarjeta = this.formulario.get('tarjetaCineco')?.value;

    if (
      !nombre ||
      !Number.isInteger(compradores) ||
      compradores <= 0 ||
      !Number.isInteger(boletos) ||
      boletos <= 0
    ) {
      this.valorPagar = 0;
      this.mensaje = 'Completa los datos correctamente.';
      return;
    }

    this.boletosMaximos = compradores * 7;

    if (boletos > this.boletosMaximos) {
      this.valorPagar = 0;
      this.mensaje = 'La cantidad de boletos supera el máximo permitido.';
      return;
    }

    let total = boletos * 12;

    if (boletos > 5) {
      total = total - (total * 0.15);
    } else if (boletos >= 3) {
      total = total - (total * 0.10);
    }

    if (tarjeta === 'Si') {
      total = total - (total * 0.10);
    }

    this.valorPagar = Number(total.toFixed(2));
    this.mensaje = 'Compra realizada por: ' + nombre;

    const registros = JSON.parse(
      localStorage.getItem('ventasCinepolis') || '[]'
    );

    const venta = {
      id: Date.now(),
      nombre: nombre,
      cantidadCompradores: compradores,
      tarjetaCineco: tarjeta,
      cantidadBoletos: boletos,
      valorPagar: this.valorPagar
    };

    registros.push(venta);

    localStorage.setItem(
      'ventasCinepolis',
      JSON.stringify(registros)
    );

  }

  verRegistros(): void {
    this.router.navigate(['/escuela/ver-registros']);
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