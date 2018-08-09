import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from './servicios/auth.service';
import * as firebase from 'firebase/app';
import { MessagingService } from "./servicios/messaging.service";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public cct: string;
  message;
  
  constructor(
    public router: Router,
    public authService: AuthService,
    private db: AngularFireDatabase
  ) { 
    
  }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if ( auth ){
        firebase.database().ref('user'+ auth.uid).once('value').then(snapshot => {
          this.cct = snapshot.child('cct').val();
          if(this.cct == 'no' || this.cct == null){
            this.router.navigate(['/home/cct']);
          }else{
            this.router.navigate(['/home/inicio']);
          }
         });
      } else{
        this.router.navigate(['/login']);
      }
    })
    
    
  }
}

