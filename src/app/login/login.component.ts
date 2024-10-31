import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { onSnapshot } from '@angular/fire/firestore';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { NgForm } from '@angular/forms';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { HelpersService } from '../services/helpers.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})



export class LoginComponent {

  loginstatus: boolean = false
  inputMail: any;
  inputPassword: any;


  constructor(public firebaseService: FirebaseService, private authService: AuthService, private helpers: HelpersService) {
    console.log(this.firebaseService.testDatabase)
    this.subAllUser()
  }


  subAllUser() {
    onSnapshot(this.firebaseService.testDatabase, (list) => {

      list.forEach(element => {
        console.log(element.data())
      });
    });
  }




  /**
   * Loginlogic
   * @param form the form from the inputcontainer in the HTML doc
   */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      //formular gültig
      this.loginstatus = await this.loginEmailPassword(form)
      if (!this.loginstatus) {
        //möglicher code wenn login fehlgeschalgen ist
      }
    } else {
      //formular ungültig
    }
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


  /**
   * login guest account with preset Logindata
   */
  async loginGuest() {

    const userCredentail = await signInWithEmailAndPassword(this.authService.auth, 'gast@gast.de', 'gast1234')
    this.loginstatus = true
    this.helpers.redirectTo('panel/summary', 1000)


  }


  testMethod(){
    console.log('All mighty push')
  }

}









