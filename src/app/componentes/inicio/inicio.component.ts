import { Component, OnInit } from '@angular/core';
import { MessagingService } from "../../servicios/messaging.service";
import { AuthService } from '../../servicios/auth.service';
import * as firebase from 'firebase/app';
import { HomeComponent } from '../home/home.component'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public cct: string;
  message;
  constructor(
    public authService: AuthService,
    private msgService: MessagingService,
    private home: HomeComponent
  ) { }

  ngOnInit() {
    this.home.updateUser();
    this.authService.getAuth().subscribe(auth => {
      if(auth){
         firebase.database().ref('user'+ auth.uid).once('value').then(snapshot => {
          this.cct = snapshot.child('cct').val();
       });
      }
    });
    this.msgService.getPermission();
    //this.msgService.subscribe();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }

}
