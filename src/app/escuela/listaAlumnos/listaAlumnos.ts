
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { IAlumno } from './alumnos';

@Component({
  selector: 'app-listaAlumnos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
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

    this.nuevoAlumno.matricula = this.formulario.value.matricula;
    this.nuevoAlumno.nombre = this.formulario.value.nombre;
    this.nuevoAlumno.correo = this.formulario.value.correo;
    this.nuevoAlumno.materia = this.formulario.value.materia;

    this.agregarAlumno();
  }

  agregarAlumno(): void {

    if (
      !this.nuevoAlumno.matricula?.trim() ||
      !this.nuevoAlumno.nombre?.trim() ||
      !this.nuevoAlumno.correo?.trim() ||
      !this.nuevoAlumno.materia?.trim()
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

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );

    this.limpiarCampos();
  }

  cargarAlumnos(): void {

    const datos = localStorage.getItem('alumnos');

    if (datos) {
      this.alumnos = JSON.parse(datos);
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

    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );
  }

  limpiarCampos(): void {

    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    };

    this.formulario.reset({
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    });

    this.indiceEdicion = -1;
  }

}
