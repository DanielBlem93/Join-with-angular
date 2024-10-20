import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { onSnapshot } from '@angular/fire/firestore';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(public firebaseService: FirebaseService) {
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

}









