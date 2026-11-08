export class AlumnosUtl {
  matricula: number;
  nombre: string;
  apaterno: string;
  amaterno: string;
  correo: string;

  constructor(
    matricula: number,
    nombre: string,
    apaterno: string,
    amaterno: string,
    correo: string
  ) {
    this.matricula = matricula;
    this.nombre = nombre;
    this.apaterno = apaterno;
    this.amaterno = amaterno;
    this.correo = correo;
  }
}