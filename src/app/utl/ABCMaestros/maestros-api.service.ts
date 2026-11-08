
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MaestrosUtl } from './maestros-utl';

@Injectable({
  providedIn: 'root'
})
export class MaestrosApiService {

  private API_MAESTROS = 'http://127.0.0.1:5000/api/maestros/';

  constructor(private http: HttpClient) {}

  getMaestros(): Observable<MaestrosUtl[]> {
    return this.http.get<any>(this.API_MAESTROS).pipe(
      map(response =>
        Array.isArray(response) ? response : response?.maestros ?? []
      )
    );
  }

  getMaestro(id_maestro: number): Observable<any> {
    return this.http.get<any>(this.API_MAESTROS + id_maestro);
  }

  agregarMaestro(maestro: MaestrosUtl): Observable<any> {
    return this.http.post<any>(this.API_MAESTROS, maestro);
  }

  modificarMaestro(id_maestro: number, maestro: MaestrosUtl): Observable<any> {
    return this.http.put<any>(this.API_MAESTROS + id_maestro, maestro);
  }

  eliminarMaestro(id_maestro: number): Observable<any> {
    return this.http.delete<any>(this.API_MAESTROS + id_maestro);
  }
}
