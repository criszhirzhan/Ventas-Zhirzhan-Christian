import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos: Observable<any[]>;
  constructor(public productoService: ProductosService,
    public router: Router) { }

    ngOnInit() {
      this.productos = this.productoService.getProductos();
  }

  verProductoById(uid: string) {
    console.log(uid);
    const url = '/ver-producto/' + uid;
    this.router.navigate([url]);
}
/*
  nuevoContacto() {
      this.router.navigate(['/contacto']);

  }

  editarContacto(contacto: Mensaje) {
      let navigationExtras: NavigationExtras = {
          queryParams: {
              contacto: contacto
             
          }

      }

      this.router.navigate(['/contacto'], navigationExtras);
  }

  editarContactoById(uid: string) {
      const url = '/contacto/' + uid;
      this.router.navigate([url]);
  }

  async borrarContacto(uid: string) {
      this.contactoService.borrarContacto(uid);
      this.notificacionesService.notificacionToast("Registro borrado");
  }

  async confirmarBorrado(uid: string) {
      this.notificacionesService.confirmacion(
          "Confirmar",
          "Esta seguro de borrar",
          this.borrarContacto.bind(this, uid));
  }
*/
}
