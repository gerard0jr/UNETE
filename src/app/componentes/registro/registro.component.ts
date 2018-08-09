import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import{ AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router'
import { DatabaseService } from '../../servicios/database/database.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public email: string;
  public password: string;
  public nombre: string;
  public cel: string;
  public tel: string;
  public cct: string;
  public photo = "assets/img/default.png";
  
  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public flashMessage: FlashMessagesService,
    public db: DatabaseService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if ( auth ){
        this.router.navigate(['/home/inicio']);
      } else{
      this.router.navigate(['/registro']);
      }
    })

    //VALIDACIONES
    var incorrectoName, incorrectoMail, incorrectoPass, incorrectoRpass, incorrectoCel, incorrectoTel, incorrectoCct;
    var arroba = '@';
    var name = document.getElementById("nombre");
    var mail = document.getElementById("email");
    var pass = document.getElementById("password");
    var rpass = document.getElementById("rpassword");
    var cel = document.getElementById("cel");
    var tel = document.getElementById("tel");
    var cct = document.getElementById("cct");
    var boton = document.getElementById("deshabilitar");



    function valName(){
      var nombre = document.forms["fregistro"]["nombre"];
      if(nombre.value == ''){
        incorrectoName = true;
      }else{
        incorrectoName = false;
      }
      evaluar();
    }

    function valCel(){
      var celular = document.forms["fregistro"]["cel"];
      if(celular.value == ''){
        incorrectoCel = true;
      }else{
        incorrectoCel = false;
      }
      evaluar();
    }

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
      var passlen = password.value.length;
      if(password.value == '' || passlen < 6){
        incorrectoPass = true;
      }else{
        incorrectoPass = false;
      }
      evaluar();
    }

    function valRpass(){
      var rpassword = document.forms["fregistro"]["rpassword"];
      var password = document.forms["fregistro"]["password"];
      if(rpassword.value != password.value){
        incorrectoRpass = true;
      }else{
        incorrectoRpass = false;
      }
      evaluar();
    }

    function valCct(){
      var cct = document.forms["fregistro"]["cct"];
      var cctValidate = /^\d{2}[A-Za-z]{3}\d{4}[A-Za-z]$/
      var responsecct = cctValidate.test(cct.value);
      if(cct.value == '' || responsecct == false){
        incorrectoCct = true;
      }else{
        incorrectoCct = false;
      }
      evaluar();
    }

    function evaluar(){
    if (incorrectoName){
        document.getElementById("iname").style.display = "block";
        document.getElementById("deshabilitar").classList.add("disabled");
        document.getElementById("deshabilitar").setAttribute('disabled','disabled');
      } else {
        document.getElementById("iname").style.display = "none";
      }

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

    if (incorrectoRpass){
        document.getElementById("irpass").style.display = "block";
        document.getElementById("deshabilitar").classList.add("disabled");
        document.getElementById("deshabilitar").setAttribute('disabled','disabled');
      } else {
        document.getElementById("irpass").style.display = "none";
      }

    if (incorrectoCel){
        document.getElementById("icel").style.display = "block";
        document.getElementById("deshabilitar").classList.add("disabled");
        document.getElementById("deshabilitar").setAttribute('disabled','disabled');
      } else {
        document.getElementById("icel").style.display = "none";
      }
      
    if(!incorrectoName && !incorrectoMail && !incorrectoPass && !incorrectoRpass && !incorrectoCel && !incorrectoCct){
        document.getElementById("deshabilitar").classList.remove("disabled");
        document.getElementById("deshabilitar").removeAttribute('disabled');
      }
    }

    function evaluarTodo(){
      valName();
      valMail();
      valPass();
      valRpass();
      valCel();
      valCct();
    }

    name.addEventListener("keyup", valName , true);
    mail.addEventListener("keyup", valMail , true);
    pass.addEventListener("keyup", valPass , true);
    rpass.addEventListener("keyup", valRpass , true);
    cel.addEventListener("keyup", valCel , true);
    cct.addEventListener("keyup", valCct , true);
    boton.addEventListener("click", evaluarTodo , true);
    
  }

  onSubmitAddUser(){
    this.authService.registerUser(this.email, this.password)
    .then ((res) => {
      this.authService.getAuth().subscribe(auth => {
        if (auth){
          console.log('registro guardado');
          this.db.guardaRegistro(auth.uid,this.nombre,this.email,this.cel,this.cct,this.photo);
        }
      });
      this.flashMessage.show('Registro correcto', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/home/inicio']);
    }).catch((err) => {
      console.log(err);
      this.flashMessage.show('Error, email en uso', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/registro']);
    })
  }
  
    
  
 
}

