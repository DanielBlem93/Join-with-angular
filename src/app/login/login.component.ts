import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { onSnapshot } from '@angular/fire/firestore';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { HelpersService } from '../services/helpers.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule,
    ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})



export class LoginComponent implements OnInit {

  loginstatus: boolean = false
  inputPassword!: string;
  inputMail!: string;


  constructor(public firebaseService: FirebaseService, private authService: AuthService, private helpers: HelpersService) {

  }

  async ngOnInit(): Promise<any> {
    this.loginstatus = false;
    await this.logutIfUserIsLoggedIn()
  }




  /**
   * Loginlogic
   * @param form the form from the inputcontainer in the HTML doc
   */
  async onSubmit(form: NgForm) {
    console.log(form.controls)
    if (form.valid) {
      //formular gültig
      this.loginstatus = await this.loginEmailPassword(form)
      console.log(this.authService.auth.currentUser)

      if (!this.loginstatus) {
        //möglicher code wenn login fehlgeschalgen ist
      }
    } else {
      //formular ungültig
    }
  }


  /**
   * login guest account with preset Logindata
   */
  async loginGuest() {

    const userCredentail = await signInWithEmailAndPassword(this.authService.auth, 'gast@gast.de', 'gast1234')
    this.loginstatus = true
    this.helpers.redirectTo('panel/summary', 1000)
    console.log('login as guest')
    this.loginstatus = true

  }



  /**
   *Log the user into the Firebase with email and passwort 
   */
  async loginEmailPassword(form: NgForm) {
    const loginEmail = this.inputMail
    const loginPassword = this.inputPassword

    try {
      const userCredentail = await signInWithEmailAndPassword(this.authService.auth, loginEmail, loginPassword)

      return true
    } catch (err: any) {
      return false
    }
  }


  // if you logged in and you return back somehow to the login window. You will be logged out automaticly
  async logutIfUserIsLoggedIn() {
    if (this.authService.auth.currentUser !== null) {
      await this.authService.signout()
    }
  }





  testMethod() {
    console.log('All mighty push')
  }

}









