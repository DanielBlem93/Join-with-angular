import { Component, OnDestroy, OnInit, NgZone, Renderer2 } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { FormsModule, NgForm, } from '@angular/forms';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthenticationService } from '../services/authentication.service';
import { HelpersService } from '../services/helpers.service';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ResponsiveService } from '../services/responsive.service';
import { NotAJoinUserComponent } from "./header/not-ajoin-user/not-ajoin-user.component";
import { introAnimation } from '../animations/intro.animation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule,
    CommonModule, NotAJoinUserComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [introAnimation]
})



export class LoginComponent implements OnInit, OnDestroy {

  loginstatus: boolean = false
  inputPassword!: string;
  inputMail!: string;
  isSmallScreen!: boolean;

  constructor(public firebaseService: FirebaseService,
    public authService: AuthenticationService,
    private helpers: HelpersService,
    public responsiveService: ResponsiveService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {

  }
  ngOnDestroy(): void {
    this.responsiveService.unsubscribe()
  }

  async ngOnInit(): Promise<any> {
    this.blockScroll()
    this.loginstatus = false;
    this.hasLogIn()
    this.responsiveService.screenListener()

  }


  /**
   * Block the scroll of the main container while the animation is running
   */
  blockScroll() {
    this.ngZone.run(() => {
      const mainContainer = document.querySelector('.main-container');
      if (mainContainer) {
        this.renderer.setStyle(mainContainer, 'overflow', 'hidden');
        setTimeout(() => {
          this.renderer.removeStyle(mainContainer, 'overflow');
        }, 500);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }


  /**
   * Return back to Summary page if user is logged in
   */
  hasLogIn() {
    if (this.authService.auth.currentUser) {
      this.helpers.redirectTo('/panel/summary', 0)
    }
  }





  /**
   * Loginlogic
   * @param form the form from the inputcontainer in the HTML doc
   */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      //formular gültig
      this.loginstatus = await this.loginEmailPassword(form)
      console.log(this.authService.auth.currentUser)

      if (!this.loginstatus) {
        //  this.helpers.redirectTo('/login',0)
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
      console.log(err)
      return false
    }
  }



  /**
   * login guest account with preset Logindata
   */
  async loginGuest() {

    const userCredentail = await signInWithEmailAndPassword(this.authService.auth, 'gast@gast.de', 'gast1234')
    this.loginstatus = true
    // this.helpers.redirectTo('panel/summary', 1000)
    console.log('login as guest')

  }

}









