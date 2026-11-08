
import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'formularios',
    children: [
      {
        path: 'usuario',
        loadComponent: () =>
          import('./formularios/usuario/usuario')
            .then(c => c.Usuario)
      },
      {
        path: 'zodiaco',
        loadComponent: () =>
          import('./formularios/zodiaco/zodiaco')
            .then(c => c.Zodiaco)
      }
    ]
  },

  {
    path: 'escuela',
    children: [
      {
        path: 'listaAlumnos',
        loadComponent: () =>
          import('./escuela/listaAlumnos/listaAlumnos')
            .then(c => c.ListaAlumnos)
      },
      {
        path: 'cinepolis',
        loadComponent: () =>
          import('./escuela/cinepolis/cinepolis')
            .then(c => c.Cinepolis)
      },
      {
        path: 'ver-registros',
        loadComponent: () =>
          import('./escuela/ver-registros/ver-registros')
            .then(c => c.VerRegistros)
      }
    ]
  },

  // ABC Alumnos
  {
    path: 'utl/alumnos',
    loadComponent: () =>
      import('./utl/ABCAlumnos/alumnos/alumnos')
        .then(c => c.AlumnosComponent)
  },
  {
    path: 'utl/agregar',
    loadComponent: () =>
      import('./utl/ABCAlumnos/agregar/agregar')
        .then(c => c.AgregarComponent)
  },
  {
    path: 'utl/editar/:matricula',
    loadComponent: () =>
      import('./utl/ABCAlumnos/editar/editar')
        .then(c => c.Editar)
  },
  {
    path: 'utl/eliminar/:matricula',
    loadComponent: () =>
      import('./utl/ABCAlumnos/eliminar/eliminar')
        .then(c => c.Eliminar)
  },

  // ABC Maestros
  {
    path: 'utl/maestros',
    loadComponent: () =>
      import('./utl/ABCMaestros/maestros/maestros')
        .then(c => c.MaestrosComponent)
  },
  {
    path: 'utl/maestros/agregar',
    loadComponent: () =>
      import('./utl/ABCMaestros/agregar/agregar')
        .then(c => c.AgregarMaestro)
  },
  {
    path: 'utl/maestros/editar/:id',
    loadComponent: () =>
      import('./utl/ABCMaestros/editar/editar')
        .then(c => c.EditarMaestro)
  },
  {
    path: 'utl/maestros/eliminar/:id',
    loadComponent: () =>
      import('./utl/ABCMaestros/eliminar/eliminar')
        .then(c => c.EliminarMaestro)
  },

  {
    path: '',
    redirectTo: 'utl/alumnos',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'utl/alumnos'
  }

];
