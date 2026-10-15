import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-registros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ver-registros.html'
})
export class VerRegistros implements OnInit {

  registros: any[] = [];
  idEditar: number | null = null;

  formulario = new FormGroup({
    nombre: new FormControl(''),
    cantidadCompradores: new FormControl(1),
    tarjetaCineco: new FormControl('No'),
    cantidadBoletos: new FormControl(1)
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }

  cargarRegistros(): void {
    this.registros = JSON.parse(
      localStorage.getItem('ventasCinepolis') || '[]'
    );
  }

  editar(venta: any): void {
    this.idEditar = venta.id;

    this.formulario.patchValue({
      nombre: venta.nombre,
      cantidadCompradores: venta.cantidadCompradores,
      tarjetaCineco: venta.tarjetaCineco,
      cantidadBoletos: venta.cantidadBoletos
    });
  }

  actualizar(): void {
    if (this.idEditar === null) {
      return;
    }

    const datos = this.formulario.getRawValue();

    const nombre = datos.nombre?.trim() || '';
    const compradores = Number(datos.cantidadCompradores);
    const boletos = Number(datos.cantidadBoletos);
    const cineco = datos.tarjetaCineco || 'No';

    if (
      !nombre ||
      !Number.isInteger(compradores) ||
      compradores <= 0 ||
      !Number.isInteger(boletos) ||
      boletos <= 0
    ) {
      alert('Completa los datos correctamente.');
      return;
    }

    if (boletos > compradores * 7) {
      alert('Cada comprador puede adquirir máximo 7 boletos.');
      return;
    }

    let total = boletos * 12;

    if (boletos > 5) {
      total = total - total * 0.15;
    } else if (boletos >= 3) {
      total = total - total * 0.10;
    }

    if (cineco === 'Si') {
      total = total - total * 0.10;
    }

    this.registros = this.registros.map(venta =>
      venta.id === this.idEditar
        ? {
            ...venta,
            nombre: nombre,
            cantidadCompradores: compradores,
            tarjetaCineco: cineco,
            cantidadBoletos: boletos,
            valorPagar: Number(total.toFixed(2))
          }
        : venta
    );

    this.guardarRegistros();

    this.idEditar = null;

    this.formulario.reset({
      nombre: '',
      cantidadCompradores: 1,
      tarjetaCineco: 'No',
      cantidadBoletos: 1
    });
  }

  eliminar(id: number): void {
    this.registros = this.registros.filter(
      venta => venta.id !== id
    );

    this.guardarRegistros();

    if (this.idEditar === id) {
      this.idEditar = null;

      this.formulario.reset({
        nombre: '',
        cantidadCompradores: 1,
        tarjetaCineco: 'No',
        cantidadBoletos: 1
      });
    }
  }

  guardarRegistros(): void {
    localStorage.setItem(
      'ventasCinepolis',
      JSON.stringify(this.registros)
    );
  }

  regresar(): void {
    this.router.navigate(['/escuela/cinepolis']);
  }

}