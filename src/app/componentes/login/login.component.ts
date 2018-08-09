import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatabaseService } from '../../servicios/database/database.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public cct;
  public newUser: string;
  public foto: string;
  public numero: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMessage: FlashMessagesService,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    var incorrectoMail, incorrectoPass;
    var arroba = '@';
    var mail = document.getElementById("email");
    var pass = document.getElementById("password");

    function valMail(){
      var email = document.forms["fregistro"]["email"];
      if(email.value == '' || email.value.indexOf(arroba) == -1){
        incorrectoMail = true;
        
      }else{
        incorrectoMail = false; 
        
      }
      evaluar();
    }

    function valPass(){
      var password = document.forms["fregistro"]["password"];
      if(password.value == ''){
        incorrectoPass = true;
      }else{
        incorrectoPass = false;
      }
      evaluar();
    }

    function evaluar(){
    if (incorrectoMail){
        document.getElementById("imail").style.display = "block";
        document.getElementById("deshabilitar").classList.add("disabled");
        document.getElementById("deshabilitar").setAttribute('disabled','disabled');
      } else{
        document.getElementById("imail").style.display = "none";
      }
    if (incorrectoPass){
        document.getElementById("ipass").style.display = "block";
        document.getElementById("deshabilitar").classList.add("disabled");
        document.getElementById("deshabilitar").setAttribute('disabled','disabled');
      } else {
        document.getElementById("ipass").style.display = "none";
      }
      
    if(!incorrectoMail && !incorrectoPass){
        document.getElementById("deshabilitar").classList.remove("disabled");
        document.getElementById("deshabilitar").removeAttribute('disabled');
      }
    }

    mail.addEventListener("keyup", valMail , true);
    pass.addEventListener("keyup", valPass , true);
    
    

    
  }

  onSubmitLogin(){
    this.authService.loginEmail(this.email,this.password)
    .then((res) => {
      this.flashMessage.show('Bienvenido(a), espera por favor', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/home/inicio']);
    }).catch((err) => {
      this.flashMessage.show('Nombre de usuario o contraseña incorrectos', {cssClass: 'alert-success', timeout: 4000});
    });
  }

  onClickGoogle(){
    this.authService.loginGoogle()
    .then((res) => {
      this.authService.getAuth().subscribe( auth => {
        if ( auth ){
          if(auth.photoURL == null){
            this.foto = 'assets/img/default.png';
          }else{
            this.foto = auth.photoURL;
          }
          if(auth.phoneNumber == null){
            this.numero = ''
          }else{
            this.numero = auth.phoneNumber;
          }
          firebase.database().ref('user'+ auth.uid).once('value').then(snapshot => {
            this.cct = snapshot.child('cct').val();
            if(this.cct == null){
              this.db.guardaUsuarioNocct(auth.uid,auth.displayName,auth.email,this.foto,this.numero);
              this.flashMessage.show('Bienvenido(a), espera por favor', {cssClass: 'alert-success', timeout: 4000});
              this.router.navigate(['home/cct']);
             }else{
              this.db.guardaUsuario(auth.uid,auth.displayName,auth.email,this.foto,this.numero,this.cct);
              this.flashMessage.show('Bienvenido(a), espera por favor', {cssClass: 'alert-success', timeout: 4000}); 
              this.router.navigate(['home/inicio']);
             }
          });
          
           
        }
      });

    }).catch((err) => {
      this.flashMessage.show('No pudimos iniciar sesión :(', {cssClass: 'alert-success', timeout: 4000});
    })
  }

  onClickFacebook(){
    this.authService.loginFacebook()
    .then((res) => {
      this.authService.getAuth().subscribe( auth => {
        if ( auth ){
          if(auth.photoURL == null){
            this.foto = 'assets/img/default.png';
          }else{
            this.foto = auth.photoURL + '?height=500';
          }
          if(auth.phoneNumber == null){
            this.numero = ''
          }else{
            this.numero = auth.phoneNumber;
          }
          firebase.database().ref('user'+ auth.uid).once('value').then(snapshot => {
            this.cct = snapshot.child('cct').val();
            if(this.cct == null){
             this.db.guardaUsuarioNocct(auth.uid,auth.displayName,auth.email,this.foto,this.numero);
             this.flashMessage.show('Bienvenido(a), espera por favor', {cssClass: 'alert-success', timeout: 4000});
              this.router.navigate(['home/cct']);
            }else{
             this.db.guardaUsuario(auth.uid,auth.displayName,auth.email,this.foto,this.numero,this.cct);
             this.flashMessage.show('Bienvenido(a), espera por favor', {cssClass: 'alert-success', timeout: 4000}); 
             this.router.navigate(['home/inicio']);
            }
          });
          
           
        }
      });
    }).catch((err) => {
      this.flashMessage.show('No pudimos iniciar sesión :(', {cssClass: 'alert-success', timeout: 4000});
      console.log(err);
    })
  }

  onClickForgot(){
    this.authService.forgotFassword(this.email)
    .then((res) => {
      this.flashMessage.show('Link enviado a tu correo', {cssClass: 'alert-success', timeout: 4000});
    }).catch((err) => {
      this.flashMessage.show('Dirección de correo errónea o no registrada', {cssClass: 'alert-success', timeout: 4000});
    })
  }

}
