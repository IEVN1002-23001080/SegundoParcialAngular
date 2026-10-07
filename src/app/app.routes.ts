import { Routes } from '@angular/router';
import { ListaAlumnos } from './escuela/listaAlumnos/listaAlumnos';

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
        component: ListaAlumnos
      }

    ]
  },

  {
    path: '**',
    redirectTo: ''
  }

];