import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  googleAuthProvider = new GoogleAuthProvider();

  auth = getAuth()
  emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\u0022(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\u0022)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;



  constructor(public router: Router, private helpers: HelpersService,) {
    this.loginListener()
    // this.auth.useDeviceLanguage()
  }



  async loginListener() {
    onAuthStateChanged(this.auth, (user) => {
      // https://firebase.google.com/docs/reference/js/auth.user
      if (user) {
        this.afterLogin()
      }else
      this.signout()
    });
  }


  /**
   * set user online and redirect to board
   */
  afterLogin() {
    if (this.router.url === '/createaccount/avatar') {
      this.helpers.redirectTo('/panel/summary', 3000)

    } else {
      this.helpers.redirectTo('/panel/summary', 3000)

    }

  }



  /**
   * use this to singout user
   */
  async signout() {
    await signOut(this.auth)
    this.helpers.redirectTo('/login', 0)
    console.log('logged out', this.auth.currentUser)
  }

}
