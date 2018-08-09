import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from '../../servicios/database/database.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-cct',
  templateUrl: './cct.component.html',
  styleUrls: ['./cct.component.scss']
})
export class CctComponent implements OnInit {
  public foto: string;
  public nombre: string;
  public cct: string;
  public id: string;
  constructor(
    public router: Router,
    public authService: AuthService,
    public flashMessage: FlashMessagesService,
    public db: DatabaseService,
    private route: ActivatedRoute
  ) { 
  }



  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.id = auth.uid;
         firebase.database().ref('user'+ auth.uid).once('value').then(snapshot => {
          this.foto = snapshot.child('foto').val();
          this.nombre = snapshot.child('nombre').val();
          this.cct = snapshot.child('cct').val();
          if(this.cct != null){
            this.router.navigate( ['home/inicio']/*, {relativeTo: this.route} */);
          }
       });
      }
    });

    var valido;
    var cct = document.getElementById('cct');
    var boton = document.getElementById("deshabilitar");
    
    function valCCT(){
      var cct = document.forms["fregistro"]["cct"];
      var cctValidate = /^\d{2}[A-Za-z]{3}\d{4}[A-Za-z]$/
      var responsecct = cctValidate.test(cct.value);
      if(cct.value == '' || responsecct == false){
        valido = true;
      }else{
        valido = false;
      }
      evaluar();
    }

    function evaluar(){
      if (valido){
          document.getElementById("icct").style.display = "block";
          document.getElementById("deshabilitar").classList.add("disabled");
          document.getElementById("deshabilitar").setAttribute('disabled','disabled');
        } else {
          document.getElementById("icct").style.display = "none";
          document.getElementById("deshabilitar").classList.remove("disabled");
          document.getElementById("deshabilitar").removeAttribute('disabled');
        }
    }
    cct.addEventListener('keyup',valCCT , true);
    boton.addEventListener("click", evaluar , true);
  }

  onSubmitCCT(){
      this.db.guardacct(this.id,this.cct);
      this.flashMessage.show('Muchas gracias, tu CCT ha sido guardado. Redirigiendo a la página principal...', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate( ['home/inicio']);
  }

}


