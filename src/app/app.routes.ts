import { Routes } from '@angular/router';
import { ListaAlumnos } from './escuela/listaAlumnos/listaAlumnos';
import { Cinepolis } from './escuela/cinepolis/cinepolis';



export const routes: Routes = [

  {
    path: 'formularios',
    children: [

      {
        path: 'usuario',
        loadComponent: () =>
          import('./formularios/usuario/usuario').then(
            (c) => c.Usuario
          )
      },

      {
        path: 'zodiaco',
        loadComponent: () =>
          import('./formularios/zodiaco/zodiaco').then(
            (c) => c.Zodiaco
          )
      }

    ]
  },

  {
    path: 'escuela',
    children: [

      {
        path: 'listaAlumnos',
        loadComponent: () =>
          import('./escuela/listaAlumnos/listaAlumnos').then(
            (c) => c.ListaAlumnos
          )
      },

      {
        path: 'cinepolis',
        loadComponent: () =>
          import('./escuela/cinepolis/cinepolis').then(
            (c) => c.Cinepolis
          )
      }

    ]
  },

  {
    path: '**',
    redirectTo: ''
  }

];