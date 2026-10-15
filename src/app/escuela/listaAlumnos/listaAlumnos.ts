
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import { IAlumno } from './alumnos';

@Component({
  selector: 'app-listaAlumnos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './listaAlumnos.html'
})
export class ListaAlumnos implements OnInit {

  formulario!: FormGroup;

  alumnos: IAlumno[] = [];

  indiceEdicion = -1;

  nuevoAlumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };

  ngOnInit(): void {

    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl('')
    });

    this.cargarAlumnos();
  }

  muestraAlumnos(): void {

    this.nuevoAlumno = {
      matricula: this.formulario.value.matricula ?? '',
      nombre: this.formulario.value.nombre ?? '',
      correo: this.formulario.value.correo ?? '',
      materia: this.formulario.value.materia ?? ''
    };

    this.agregarAlumno();
  }

  agregarAlumno(): void {

    if (
      !this.nuevoAlumno.matricula.trim() ||
      !this.nuevoAlumno.nombre.trim() ||
      !this.nuevoAlumno.correo.trim() ||
      !this.nuevoAlumno.materia.trim()
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.indiceEdicion !== -1) {

      this.alumnos[this.indiceEdicion] = {
        ...this.nuevoAlumno
      };

    } else {

      this.alumnos.push({
        ...this.nuevoAlumno
      });

    }

    this.guardarAlumnos();
    this.limpiarCampos();
  }

  guardarAlumnos(): void {

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );

  }

  cargarAlumnos(): void {

    const datos = localStorage.getItem('alumnos');

    if (datos) {

      try {
        this.alumnos = JSON.parse(datos);
      } catch {
        alert('No se pudieron cargar los alumnos guardados');
        this.alumnos = [];
      }

    } else {

      this.alumnos = [];

    }

  }

  editarAlumnos(index: number): void {

    const alumno = this.alumnos[index];

    this.nuevoAlumno = {
      ...alumno
    };

    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    });

    this.indiceEdicion = index;
  }

  eliminarAlumno(index: number): void {

    this.alumnos.splice(index, 1);

    if (this.indiceEdicion === index) {

      this.limpiarCampos();

    } else if (this.indiceEdicion > index) {

      this.indiceEdicion--;

    }

    this.guardarAlumnos();
  }

  limpiarCampos(): void {

    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    };

    this.formulario.patchValue({
      matricula: this.nuevoAlumno.matricula,
      nombre: this.nuevoAlumno.nombre,
      correo: this.nuevoAlumno.correo,
      materia: this.nuevoAlumno.materia
    });

    this.indiceEdicion = -1;
  }

}
