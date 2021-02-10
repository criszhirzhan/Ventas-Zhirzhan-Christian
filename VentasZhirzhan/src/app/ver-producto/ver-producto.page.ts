import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../models/producto';
import { ProductosService } from '../services/productos.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../models/carrito';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.page.html',
  styleUrls: ['./ver-producto.page.scss'],
})
export class VerProductoPage implements OnInit {

  producto: Producto = new Producto();
  carrito: Carrito = new Carrito();
  uid: string;
  constructor(public router: Router, public productotService: ProductosService, private route: ActivatedRoute,
    public carritoService: CarritoService) {
    this.uid = this.route.snapshot.paramMap.get('uid');
    console.log(this.uid);
    this.productotService.getProductoById2(this.uid).subscribe(data => {
        console.log(data)
        const aux: any = data
        this.producto = aux[0]
    });

    console.log(this.producto);
}


  ngOnInit() {
  }

  agregarCarrito(){
    this.carrito.producto = this.producto;
    this.carritoService.saveProducto(this.carrito);
    this.carrito = new Carrito();
    alert("Producto agregado");
    this.router.navigate(['productos']);
  }

}
