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

  nuevoAlumno: IAlumno = {
    matricula: '***',
    nombre: '***',
    correo: '***',
    materia: '***'
  };

  ngOnInit(): void {

    this.formulario = new FormGroup({

      matricula: new FormControl(''),

      nombre: new FormControl(''),

      correo: new FormControl(''),

      materia: new FormControl('')

    });

  }
  muestraAlumnos():void{
    this.nuevoAlumno.matricula=this.formulario.value.matricula
    this.nuevoAlumno.nombre=this.formulario.value.nombre
    this.nuevoAlumno.correo=this.formulario.value.correo
    this.nuevoAlumno.materia=this.formulario.value.materia
  }
  cargarAlumnos():void{}

}