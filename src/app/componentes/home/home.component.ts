import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService, FlashMessagesModule } from 'angular2-flash-messages';
import { DatabaseService } from '../../servicios/database/database.service';
import * as firebase from 'firebase/app';
import { createElement } from '@angular/core/src/view/element';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'UNETE';
  public foto: string;
  public id: string;
  public cct: string;

  constructor(
    public router: Router,
    public authService: AuthService,
    public flashMessage: FlashMessagesService,
    public db: DatabaseService
  ) { 
  }

  ngOnInit() {


  }

  updateUser(){
    this.authService.getAuth().subscribe(auth => {
      if(auth){
         firebase.database().ref('user'+ auth.uid).once('value').then(snapshot => {
          this.foto = snapshot.child('foto').val();
          this.cct = snapshot.child('cct').val();
       });
      }
    });
  }

  copiarTexto(){
    var texto = document.getElementById('copiar') as HTMLInputElement;
    texto.select();
    document.execCommand('copy');
    this.flashMessage.show('CCT copiado!', {cssClass: 'alert-success', timeout: 4000});
  }

  onClickLogout(){
    this.flashMessage.show('Bye! :(', {cssClass: 'alert-success', timeout: 4000});
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
    
}

