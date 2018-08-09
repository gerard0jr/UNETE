import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import{ AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public nombreUsuario: string;
  public foto: string;
  public nombre: string;

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if ( auth ){
        this.nombreUsuario = auth.displayName;
        firebase.database().ref('user'+ auth.uid).once('value').then(snapshot => {
          this.foto = snapshot.child('foto').val();
        });
      
        if (this.nombreUsuario == null){
          this.nombre = 'Hola!';
        }else{
          this.nombre = 'Hola!' + ' ' + this.nombreUsuario;
        }
      }
    }); 

 }

}
