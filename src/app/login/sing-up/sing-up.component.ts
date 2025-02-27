import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.class';
import { MsgBoxComponent } from '../../msg-box/msg-box.component';
import { msgBoxAnimation } from '../../animations/msgBox.animations';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, MsgBoxComponent],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss',
  animations: [msgBoxAnimation]
})

export class SingUpComponent {


  username: string = '';
  inputPassword: string = '';
  repeatPassword: string = '';
  inputMail: string = '';


  constructor(
    public authService: AuthenticationService,
    private fireService: FirebaseService,
    public helpers: HelpersService
  ) {}


  /**
   * Handles form submission for user sign-up.
   * @param form The form object containing user inputs.
   */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      await this.createUser();
    } else {
      this.helpers.toggleMsg('Please fill out the form correctly');
    }
  }


  /**
   * Creates a new user account using the provided email and password.
   */
  async createUser() {
    try {
      await this.authService.createAccount(this.inputMail, this.inputPassword);
      const user = this.setUserDatas();
      await this.addUserToFirestore(await user);
      this.helpers.toggleMsg('Account created successfully');
      return user;
    } catch (error) {
      this.helpers.toggleMsg('Something went wrong');
      return null;
    }
  }


  /**
   * Sets user data including username and email.
   * @returns A promise that resolves to a User object with the set data.
   */
  async setUserDatas(): Promise<User> {
    let user = new User();
    user.username = this.username;
    user.email = this.inputMail;
    await this.authService.updateUsername(this.authService.auth.currentUser!, this.username);
    return user;
  }

  
  /**
   * Adds the user data to Firestore.
   * @param user The user object to be added to Firestore.
   */
  async addUserToFirestore(user: User) {
    await this.fireService.addUser(user.toJSON());
  }
}
