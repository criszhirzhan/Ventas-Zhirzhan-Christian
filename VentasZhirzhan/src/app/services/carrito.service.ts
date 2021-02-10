import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Carrito } from '../models/carrito';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(public afs: AngularFirestore) { }


  saveProducto(carrito: Carrito) {
    const refContacto = this.afs.collection("carrito");
    if (carrito.uid == null) {
      carrito.uid = this.afs.createId();
      carrito.deleted = false;
    }

    refContacto.doc(carrito.uid).set(Object.assign({}, carrito), { merge: true })
}

getCarrito(): Observable<any[]> {
  return this.afs.collection("carrito",
      ref => ref.where("deleted", "==", false)).valueChanges();
}

borrarCarrito(uid: string) {
  const refContacto = this.afs.collection("carrito");

  const aux = { deleted: true };
  refContacto.doc(uid).set({ ...aux }, { merge: true })
}

}
