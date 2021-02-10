import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(public afs: AngularFirestore) { }

  saveContacto(producto: Producto) {
    const refContacto = this.afs.collection("productos");
    if (producto.uid == null) {
      producto.uid = this.afs.createId();
      producto.deleted = false;
    }

    refContacto.doc(producto.uid).set(Object.assign({}, producto), { merge: true })
}

getProductos(): Observable<any[]> {
    return this.afs.collection("productos",
        ref => ref.where("deleted", "==", false)).valueChanges();
}


async getProductoById(uid: string) {
    try {
        let aux = await this.afs.collection("productos",
            ref => ref.where('uid', '==', uid))
            .valueChanges().pipe(first()).toPromise().then(doc => {
                return doc;
            }).catch(error => {
                throw error;
            });
        if (aux == null)
            return {};
        return aux[0];
    } catch (error) {
        console.error("Error get productos ById", error);
        throw error;
    }
}

getProductoById2(uid: string): Observable<any> {
    return this.afs.collection("productos",
        ref => ref.where('uid', '==', uid))
        .valueChanges();
}

borrarProducto(uid: string) {
    const refContacto = this.afs.collection("productos");

    const aux = { deleted: true };
    refContacto.doc(uid).set({ ...aux }, { merge: true })
}
}
