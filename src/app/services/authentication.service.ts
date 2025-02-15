import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut, updateProfile, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HelpersService } from './helpers.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'any'
})




export class AuthenticationService {

  
firebaseApp = initializeApp({
  "projectId": "join-with-angular",
  "appId": "1:896578690049:web:f708bcd0204243c221f400",
  "storageBucket": "join-with-angular.firebasestorage.app",
  "apiKey": "AIzaSyDSQn2ZkZUU30fgAKyYoQOcQls1Dehh2Kc",
  "authDomain": "join-with-angular.firebaseapp.com",
  "messagingSenderId": "896578690049"
})

  auth = getAuth(this.firebaseApp)
  emailRegex: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\u0022(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\u0022)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  googlelogin: boolean | undefined;




  constructor(public router: Router, 
    private helpers: HelpersService,public fireService: FirebaseService) {
    this.loginListener()
    this.auth.useDeviceLanguage()
  }


  async loginListener() {
    onAuthStateChanged(this.auth, (user) => {
      // https://firebase.google.com/docs/reference/js/auth.user
      if (user) {
        this.afterLogin()
      }
    });
  }


  /**
   * set user online and redirect to board
   */
  afterLogin() {
    if (this.router.url === '/singUp') {
      this.helpers.redirectTo('/panel/summary', 3000)

    } else {
      this.helpers.redirectTo('/panel/summary', 0)
    }
  }


  /**
   * use this to singout user
   */
  async signout() {
    await signOut(this.auth)
    this.router.navigate(['/login'])
  }


/**
   * creats a account with email and password
   * @param email email of user as string
   * @param password  pw of user as string
   */
  async createAccount(email: string, password: string) {
    const loginEmail = email
    const loginPassword = password

    try {
      const userCredentail = await createUserWithEmailAndPassword(this.auth, loginEmail, loginPassword)
    } catch (err: any) {
    }
  }

  
   /**
   * Changes the username
   * @param user needs a userCredentail.currentUser /the user you want to change / the logged in user
   * @param username the new username
   */
   async updateUsername(user: User, username: string) {
    await updateProfile(user, {
      displayName: username
    }).then(() => {
    })
  }

}
