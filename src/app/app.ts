import { Component, signal, OnInit } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Usuario } from './formularios/usuario/usuario';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [Navbar, Usuario],
  templateUrl: './app.html'
})
export class App implements OnInit {

  protected readonly title = signal('SegundoParcialAngular');

  ngOnInit(): void {
    initFlowbite();
  }

}