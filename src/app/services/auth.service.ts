import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  firebaseApp = initializeApp({
    "projectId": "join-with-angular",
    "appId": "1:896578690049:web:f708bcd0204243c221f400",
    "storageBucket": "join-with-angular.appspot.com",
    "apiKey": "AIzaSyDSQn2ZkZUU30fgAKyYoQOcQls1Dehh2Kc",
    "authDomain": "join-with-angular.firebaseapp.com",
    "messagingSenderId": "896578690049"
  })

  auth = getAuth(this.firebaseApp)
  emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\u0022(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\u0022)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;



  constructor(public router: Router, private helpers: HelpersService) { }



  async loginListener() {
    onAuthStateChanged(this.auth, (user) => {
      // https://firebase.google.com/docs/reference/js/auth.user
      if (user) {
        this.helpers.redirectTo('/board', 3000)
      }
    });
  }




}
