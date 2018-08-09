import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-manuales',
  templateUrl: './manuales.component.html',
  styleUrls: ['./manuales.component.scss']
})
export class ManualesComponent implements OnInit {
  public cct: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if ( auth ){
        firebase.database().ref('user'+ auth.uid).once('value').then(snapshot => {
          this.cct = snapshot.child('cct').val();
          if(this.cct == null){
            this.router.navigate(['/home/cct']);
          }
        });
      }
    })
  }
}
