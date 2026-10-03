import { Component, signal, OnInit } from '@angular/core';
import { Zodiaco } from './formularios/zodiaco/zodiaco';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [Zodiaco],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('SegundoParcialAngular');

  ngOnInit(): void {
    initFlowbite();
  }
}