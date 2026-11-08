import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AlumnosUtl } from './alumnos-utl';

@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {

  private API_ALUMNOS = 'http://127.0.0.1:5000/api/alumnos/';
  private API_MAESTROS = 'http://127.0.0.1:5000/api/maestros/';

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<AlumnosUtl[]> {
    return this.http.get<any>(this.API_ALUMNOS).pipe(
      map(response =>
        Array.isArray(response) ? response : response?.alumnos ?? []
      )
    );
  }

  getAlumno(matricula: number): Observable<any> {
    return this.http.get<any>(this.API_ALUMNOS + matricula);
  }

  agregarAlumno(alumno: AlumnosUtl): Observable<any> {
    return this.http.post<any>(this.API_ALUMNOS, alumno);
  }

  modificarAlumno(matricula: number, alumno: AlumnosUtl): Observable<any> {
    return this.http.put<any>(this.API_ALUMNOS + matricula, alumno);
  }

  eliminarAlumno(matricula: number): Observable<any> {
    return this.http.delete<any>(this.API_ALUMNOS + matricula);
  }

  getMaestros(): Observable<any[]> {
    return this.http.get<any>(this.API_MAESTROS).pipe(
      map(response =>
        Array.isArray(response) ? response : response?.maestros ?? []
      )
    );
  }
}