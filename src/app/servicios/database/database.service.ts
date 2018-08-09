import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { map } from "rxjs/operators";
import { AngularFireDatabase } from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  nuevo: any[];

  constructor(
    private db: AngularFireDatabase
  ) {  

   }
 
  guardaUsuario(id,nombre,email,foto,tel,cct){
    var datos = [id,nombre,email,foto,tel,cct];
    firebase.database().ref('user' + id).set({nombre,email,foto,tel,cct,id});
    console.log('Escribiendo: ' + datos);
  }

  guardaUsuarioNocct(id,nombre,email,foto,tel){
    var datos = [id,nombre,email,foto,tel];
    firebase.database().ref('user' + id).set({nombre,email,foto,tel,id});
    console.log('Escribiendo: ' + datos);
  }

  guardaRegistro(id:string ,nombre: string ,email: string ,tel: string ,cct: string,foto: string){
    var datos = [id,nombre,email,tel,cct,foto];
    firebase.database().ref('user' + id).set({foto,nombre,email,tel,cct,id});
    console.log('Escribiendo: ' + datos);
  }

  guardacct(id:string, cct:string){
    firebase.database().ref('user'+id).update({cct: cct});
  }

   newUser(id){
    this.db.list('user' + id).valueChanges().subscribe( nuevo => {
      this.nuevo = nuevo;
    });
  }


}
