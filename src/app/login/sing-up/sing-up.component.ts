import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  username: string = '';
  inputPassword: string = '';
  inputMail: string = '';
  user: User = new User();

  constructor(public authService: AuthenticationService,
    private fireService: FirebaseService
  ) {

  }


  async onSubmit(form: NgForm) {

    if (form.valid) {
      this.createUser()
    } else
      console.log(form.errors)
  }


  async createUser() {

    try {
      await this.authService.createAccount(this.inputMail, this.inputPassword,)
      this.setUserDatas()
      await this.addUserToFirestore()
    } catch (error) {
      console.log(error)
    }
  }

  async setUserDatas() {
    this.user.username = this.username
    this.user.email = this.inputMail
    await this.authService.updateUsername(this.authService.auth.currentUser!, this.username)

  }

  async addUserToFirestore() {
    await this.fireService.addUser(this.user.toJSON())

  }
  
}
