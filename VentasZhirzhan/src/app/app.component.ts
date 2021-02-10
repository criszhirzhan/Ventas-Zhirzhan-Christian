import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'productos', icon: 'mail' },
    { title: 'Registrarse', url: 'registro', icon: 'paper-plane' },
    { title: 'Carrito', url: 'carrito', icon: 'archive' },

    
  ];
 // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
