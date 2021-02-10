import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public afs: AngularFirestore) { }

  saveUsuario(usuario: Usuario) {
    const refContacto = this.afs.collection("usuarios");
    if (usuario.uid == null) {
       usuario.uid = this.afs.createId();
       usuario.deleted = false;
    }
    refContacto.doc(usuario.uid).set(Object.assign({}, usuario), { merge: true })
}

getUsuarios(): Observable<any[]> {
    return this.afs.collection("usuarios",
        ref => ref.where("deleted", "==", false)).valueChanges();
}


async getUsuarioById(uid: string) {
    try {
        let aux = await this.afs.collection("usuarios",
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
        console.error("Error get usuarios ById", error);
        throw error;
    }
}

getUsuarioById2(uid: string): Observable<any> {
    return this.afs.collection("usuarios",
        ref => ref.where('uid', '==', uid))
        .valueChanges();
}

borrarContacto(uid: string) {
    const refContacto = this.afs.collection("usuarios");

    const aux = { deleted: true };
    refContacto.doc(uid).set({ ...aux }, { merge: true })
}
}