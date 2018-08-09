import { Injectable }          from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase';
import { FlashMessagesService, FlashMessagesModule } from 'angular2-flash-messages';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  messaging: any
  currentMessage = new BehaviorSubject(null)

  constructor(
    private db: AngularFireDatabase, 
    private afAuth: AngularFireAuth,
    private flashMessage: FlashMessagesService
  ) { 
    this.messaging = firebase.messaging();
  }

  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {
      if (!user) return;

      const data = { [user.uid]: token }
      this.db.object('fcmTokens/').update(data)
    })
  }

  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
        
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }

    subscribe(){
      //this.messaging.get('all');
    } 

    receiveMessage() {
       this.messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        this.currentMessage.next(payload)
        alert(this.currentMessage.next(payload));
      });

    }
}