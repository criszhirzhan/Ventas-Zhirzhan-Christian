import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { ProductosService } from '../services/productos.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificacionesService } from '../services/notificaciones.service';
//import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carritos: Observable<any[]>;
  constructor(public router: Router, public productotService: ProductosService, private route: ActivatedRoute,
    public carritoService: CarritoService, public notificacionesService: NotificacionesService) { }

  ngOnInit() {
    this.carritos = this.carritoService.getCarrito();
  }

  async borrarCarritoP(uid: string) {
    this.carritoService.borrarCarrito(uid);
    this.notificacionesService.notificacionToast("Registro borrado");
}

async confirmarBorrado(uid: string) {
    this.notificacionesService.confirmacion(
        "Confirmar",
        "Esta seguro de borrar",
        this.borrarCarritoP.bind(this, uid));
}
/*
 llamar() {
  this.callNumber.callNumber("18001010101", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}
*/
}



